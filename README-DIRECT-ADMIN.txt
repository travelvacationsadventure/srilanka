DIRECT ADMIN VERSION
====================

This version removes the Firebase email/password login screen from /admin/.
The admin panel now starts directly and creates a Firebase Anonymous Authentication
session in the background so the existing Firebase ID-token based /api/posts calls
can continue to work.

IMPORTANT: Before uploading this version:
1. Open Firebase Console for project: travelvacationsadventure-1ec6d
2. Go to Authentication -> Sign-in method.
3. Enable "Anonymous" authentication.
4. Save the change.
5. Upload the contents of the admin/ folder to your website's /admin/ folder.

Security note:
Anonymous authentication removes the visible login barrier. If your /api/posts
backend currently requires a specific email/password user or an admin/custom claim,
it may reject the anonymous token. In that case the backend must be changed to allow
the anonymous admin session, or a different non-password admin protection should be
implemented.

The Firebase configuration remains in firebase.js and Firebase Storage is still used
for image uploads.
