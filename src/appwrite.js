import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

/**
 * Updates the count of a search term in the database, or creates a new document if it doesn't exist
 * @param {string} searchTerm - The search term to update
 * @param {object} movie - The movie object from the TMDB API
 */

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to see if the search term already exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ])

        // 2. If it does exist, update the count
        if(result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            })
        // 3. Otherwise create a new document with the search term and count as 1
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            })
        }
    } catch (error) {
        console.error(error);         
    }    
}

/**
 * Fetches the top 10 trending movies from the database based on the count of times they were searched
 * @returns {array} An array of objects containing the movie's search term, count, movie_id, and poster_url
 */
export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(10),
            Query.orderDesc('count'),
        ]);

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}