/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

"use strict";

const { onRequest } = require("firebase-functions/v2/https");
const { onValueCreated } = require("firebase-functions/v2/database");
const { logger } = require("firebase-functions");
const {getDatabase} = require("firebase-admin/database");


const admin = require("firebase-admin");
admin.initializeApp();



/* admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: "https://vistoria-4209b-default-rtdb.firebaseio.com", // Substitua pela sua databaseURL
}); */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

/* exports.helloWorld = onRequest((request, response) => {
	logger.info("Hello logs!", { structuredData: true });
	response.send("Hello from Firebase 3245!");
}); */

exports.addmessage = onRequest(async (req, resp) => {
          const database = getDatabase(admin);
	// [END addMessageTrigger]
	// Grab the text parameter.
	// const original = req.query.text;
	// [START adminSdkPush]
	// Push the new message into the Realtime Database
	// using the Firebase Admin SDK.

          const refUpdate = database.ref(database,"/fotoGeoTecnovias/liberacaoWEB");
          /* const refUpdate = ref(database,"/fotoGeoTecnovias/liberacaoWEB");
          console.log('refUpdate',refUpdate)
          const newRef = push(refUpdate);
          const campo = {
                    teste : "teste"
          }
          const snapshot = await set(newRef,campo); */

	const snapshot = await admin
		.database()
		.ref(
			"/fotoGeoTecnovias/liberacaoWEB"
		)
		.push({
			original: "original2",
		});

	// Redirect with 303 SEE OTHER to the URL
	// of the pushed object in the Firebase console.
	resp.redirect(303, snapshot.ref.toString());
	// [END adminSdkPush]
});

/* exports.checkUserPermission = functions.https.onRequest(async (req, res) => {
	const idToken = req.headers.authorization;

	if (!idToken) {
		return res.redirect(
			"/pages/login/login.html"
		);
	}

	try {
		const decodedToken =
			await admin
				.auth()
				.verifyIdToken(
					idToken
				);
		const uid = decodedToken.uid;

		// Verifique as permissões no Realtime Database
		const snapshot = await admin
			.database()
			.ref(
				`/fotoGeoTecnovias/liberacaoWEB/${uid}`
			)
			.once(
				"value"
			);

		if (
			snapshot.exists() &&
			snapshot.val()
				.liberado ===
				true
		) {
			res.sendFile(
				"pagina_protegida.html",
				{
					root: "public",
				}
			);
		} else {
			res.redirect(
				"/acesso_negado.html"
			);
		}
	} catch (error) {
		console.error(
			"Erro na verificação de permissões:",
			error
		);
		res.redirect("/login.html");
	}
});
 */
