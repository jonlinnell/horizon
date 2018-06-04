# Secret
## Description
The `secret` file contains the secret key – this is a unique string of characters used for cryptographic functions, such as signing JSON Web Tokens and encrypting passwords.

**Your secret key must NEVER leave your server.** Gaining access to a secret key will allow third parties to sign valid JSON Web Tokens and bruteforce passwords hashes.

Once you have created the file, ensure it is as secure as possible.
```bash
chmod 400 secret
```

## Generating random bytes
While this isn't a requirement, you can launch `node` and use the following code to generate a random string for your secret key.

```javascript
require('crypto').randomBytes(128).toString('hex')
// 'e3dfb8dea9477c8cd877ce8a3583ff9bb0af2362b82670f5885db14928239d6d4fab1f28daebeb6431d1ff6fe948d46529b96e30af2991dc5a924d70891a978779d4daa0eaba28a6380c2450e634d1e2064aad8b505515dd456e4037c7a8096cd66c8a3bba50e7c68831bc1a065cf91a67d05d2f3247afc9e7d1aae4367f58d3'
```
