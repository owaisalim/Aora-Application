import { Client, Account, ID, Databases, Avatars, Query, Storage} from 'react-native-appwrite';

export const Config = {
    endpoint: "https://cloud.appwrite.io/v1",
    Platform: "com.jsm.aora",
    projectId: "66d4a25e0005daf12dc4",
    databaseId: "66d4a434000ccdedd94f",
    userCollectionId: "66d4a4a80029efd077f4",
    videoCollectionId: "66d4a4f10000161ef8f8",
    storageId: "66da01c8000c01c7f1a8",
}

const  {
    endpoint,
    Platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = Config
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    // .setPlatform(Config.Platform) // Your application ID or bundle ID. (Remove this if it causes issues)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)
export const createUser = async (email, password, username) => {
    try {
        console.log("Creating user with email:", email);
        
        // Validate email format before proceeding
        if (!validateEmail(email)) {
            throw new Error("Invalid email format");
        }

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        console.log("New account created:", newAccount);

        if (!newAccount) throw new Error("Account creation failed");

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            Config.databaseId,
            Config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount,
                email,
                username,
                avatar: avatarUrl
            }
        );

        console.log("New user document created:", newUser);

        return newUser;
    } catch (error) {
        console.log("Error in createUser:", error);
        throw new Error(error.message || error);
    }
}

export const  signIn = async (email, password) => {
    try {
        console.log("Signing in with email:", email);
        
        // Validate email format
        if (!validateEmail(email)) {
            throw new Error("Invalid email format");
        }
        
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log("Error in signIn:", error.message);

        if (error.message.includes('Creation of a session is prohibited when a session is active')) {
            console.log("Session already active. Deleting existing sessions...");
            
            // Optionally, you can log out the user before creating a new session
            await account.deleteSessions(); // Delete all sessions

            const session = await account.createEmailPasswordSession(email, password);
            console.log("New session created after deleting existing sessions:", session);
            return session;
        }

        throw new Error(error.message || error);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const getCurrentUser = async() =>{
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () =>{
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents 
    } catch (error) {
        throw new Error(error)
    }
} 
export const getLatestPosts = async () =>{
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]

        )
        return posts.documents 
    } catch (error) {
        throw new Error(error)
    }
} 
export const searchPosts = async (query) =>{
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]

        )
        return posts.documents 
    } catch (error) {
        throw new Error(error)
    }
} 
export const getUserPosts = async (userId) =>{
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId),    Query.orderDesc('$createdAt')]

        )
        return posts.documents 
    } catch (error) {
        throw new Error(error)
    }
} 
export const signout = async() =>{
    try {
        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async(fileId, type) =>{
let fileUrl;
try {
    if(type ==='video'){
        fileUrl = storage.getFileView(storageId, fileId)
    }else if(type ==='image'){
        fileUrl = storage.getFilePreview(storageId, fileId,2000,2000,'top',100)
    }
    else{throw new Error('Invalid file type')}
    if(!fileUrl) throw new Error
    return fileUrl

} catch (error) {
    throw new Error(error)
}
}
export const uploadFile = async(file, type) =>{
if(!file) return;
const {mimeType, ...rest} = file;
const asset ={
name:file.fileName,
type:file.mimeType,
size:file.fileSize,
uri: file.uri,

}

try {
    const uploadFile = await storage.createFile(
        storageId,
        ID.unique(),
        asset
    )
    const fileUrl = await getFilePreview(uploadFile.$id, type)
    return fileUrl
} catch (error) {
    throw new Error(error)
}
}
export const createVideo = async (form) =>{
try {
    const [thumbnailUrl,videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'video')
    ])
    const newPosts = await databases.createDocument(
        databaseId, videoCollectionId,ID.unique(), {
            title:form.title,
         thumbnail:thumbnailUrl,
            video:videoUrl,
            prompt:form.prompt,
            creator:form.userId,
       
        },
    ) 

    return newPosts
} catch (error) {
    throw new Error(error)
}
}