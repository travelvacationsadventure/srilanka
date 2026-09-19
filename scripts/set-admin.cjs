// Uses your Google Application Default Credentials; no private keys belong in this project.
const {initializeApp,applicationDefault}=require('../functions/node_modules/firebase-admin/app');
const {getAuth}=require('../functions/node_modules/firebase-admin/auth');
initializeApp({credential:applicationDefault(),projectId:'travelvacationsadventure-1ec6d'});
const email=process.argv[2];
if(!email){console.error('Usage: npm run admin -- you@example.com');process.exit(1);}
(async()=>{const auth=getAuth();const user=await auth.getUserByEmail(email);await auth.setCustomUserClaims(user.uid,{...user.customClaims,admin:true});console.log('Admin enabled for '+email+'. Sign out, then sign in again.');})().catch(e=>{console.error(e.message);process.exitCode=1;});
