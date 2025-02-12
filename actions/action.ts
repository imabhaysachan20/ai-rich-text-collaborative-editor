'use server'

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"
import { query } from "express";

export async function createNewDocument() {
    await auth.protect();
    const {sessionClaims} = await auth();
   
    const documentCollectionRef = adminDb.collection('documents');
    const docRef = await documentCollectionRef.add({
        title:"Untitled",
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        role: 'owner',
        createdAt: new Date(),
        roomId:docRef.id
    })

    return {docID:docRef.id}
}



export async function deleteDocument(id: string) {
    await auth.protect();
    try {
        const { sessionClaims } = await auth();
        if (!sessionClaims?.email) {
            return { success: false, msg: "Unauthorized" };
        }

        // Delete document from Firestore 'documents' collection
        await adminDb.collection('documents').doc(id).delete();

        // Query and delete all related 'rooms' documents
        const roomsQuery = await adminDb.collectionGroup('rooms')
            .where("roomId", "==", id)
            .get();

        const batch = adminDb.batch();
        roomsQuery.docs.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();

        // Check if the room exists in Liveblocks
        try {
            const room = await liveblocks.getRoom(id);
            if (room) {
                // Ensure all users are removed before deleting the room
                
                await liveblocks.deleteRoom(id);
            }
        } catch (err) {
            console.log("Room not found in Liveblocks, skipping deletion.");
        }

        return { success: true };
    } catch (err) {
        console.error("Error deleting document:", err);
        return { success: false, msg: "Failed to delete document" };
    }
}

export async function inviteUser(email: string,id:string) {
    try {
        const { sessionClaims } = await auth();
        if (!sessionClaims?.email) {
            return { success: false, msg: "Unauthorized" };
        }

        await adminDb.collection('users').doc(email).collection("rooms").doc(id).set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            id,
        })
            
        
        return { success: true };
    } catch (err) {
        console.error("Error deleting document:", err);
        return { success: false, msg: "Failed to invite user" };
    }
}