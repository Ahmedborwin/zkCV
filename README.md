<div align="center">
  <img src="https://gateway.pinata.cloud/ipfs/QmSv6BCXrPLhfdaicVdYQUEi7CsXN1m9LGEpwrEWPQs3yN" />
  <h3>
    Zero Knowledge Curriculum Vitae (ZKCV)
  </h3>
</div>

⚡️ Zero Knowledge Curriculum Vitae (ZKCV) leverages cutting-edge zero-knowledge proofs to ensure unparalleled privacy and security for job seekers and employers. By integrating **Semaphore Protocol** with **Particle Auth**, ZKCV offers a revolutionary approach to professional networking and job application processes.

Built using **RainbowKit** (+ Particle extension), **Wagmi**, **Typescript**, and **Particle Auth**.

## 🔐 About ZKCV

The "Zero-Knowledge CV" project introduces an innovative solution aimed at eliminating conscious and unconscious biases in the job recruitment process. By anonymizing CV submissions through Semaphore groups and blockchain technology, we ensure that candidates are judged solely on their qualifications, promoting fairness and diversity in hiring.

Employers create job advertisements as Semaphore groups, allowing applicants to submit their CVs anonymously via an IPFS hash, with personal information redacted. This process maintains applicant privacy while focusing on their skills and experiences. However, the challenge of verifying CV ownership without revealing identity led us to devise an ad-hoc solution using Ethereum's attestation service. Applicants attest to their CV's hash upon submission, and upon selection, we verify ownership by matching the attestation data against the chosen CV list, ensuring the applicant's current address aligns with the attestation creator's.

During development, we encountered technical hurdles, notably with the Semaphore's generateProof function, which proved incompatible with our front-end. This led us to opt for proof generation through an external API, a workaround that, while effective, highlighted the need for more seamless integration in future iterations. Additionally, we recognize that our project's user interface (UI) and user experience (UX) require significant enhancement. Despite these challenges, our commitment to delivering a viable solution drove us to submit our project, confident in its foundational concept and potential impact.

The "Zero-Knowledge CV" project marks a pivotal step toward a more equitable job market, where hiring is purely merit-based. Although acknowledging the necessity for a more robust verification process and improved UI/UX, we are committed to refining our solution, inspired by the progress we've made and the obstacles we've overcome.

## 🌟 Features
- **Privacy-first Approach:** Leveraging zero-knowledge proofs, ZKCV allows users to submit their CV Anonymously, then claim their CV is it chosen for the next stage of the interviewing phase.
- **Seamless Onboarding:** With Particle Auth integration, users can easily access ZKCV using social logins such as Google, GitHub, and more.
- **Decentralized Verification:** Utilizes the Semaphore protocol for decentralized and tamper-proof verification of credentials.

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/Ahmedborwin/zkCV
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_WALLETCONNECT_PROJECT_ID`, the project ID of the corresponding project in your [WalletConnect dashboard](https://cloud.walletconnect.com/app)

### Start the project
```
npm run dev
```
OR
```
yarn dev
```

##
Originally featured in "[Supercharging UX in 3, 2, and 6 minutes](https://twitter.com/TABASCOweb3/status/1707969225229529288)"

## 🔗 Useful Links
- **Semaphore Protocol:** Learn about the zero-knowledge protocol used in ZKCV. [Semaphore Documentation](https://semaphore.appliedzkp.org/)
- **Particle Network:** Discover more about Particle Auth and its integration. [Particle Network](https://particle.network)

## 📄 License
ZKCV is open source and available under the MIT license.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check [issues page](LINK_TO_YOUR_ISSUES_PAGE).
