# Cyber Security Assessment and Protection System (Part 1)

An interactive, high-tech cybersecurity assessment and endpoint protection console developed as **Part 1** of a Computer Engineering cybersecurity project. 

The system focuses directly on endpoint vulnerability evaluation, active threat intelligence, defensive protection protocols, and readiness verification across 10 core cybersecurity domains.

---

## 🛡️ System Objective

The system provides a practical, user-facing security operations console to:
1. **Assess Endpoint Vulnerability:** Conduct an interactive 5-point security diagnosis evaluating personal computer security posture (scored 0–100) with tailored remediation advice.
2. **Review Threat Intelligence & Protection Controls:** Actionable defensive profiles covering Malware, Viruses, PC/OS Hardening, Patch Management, Cyber Attack Vectors, Physical Tailgating, Ethical Auditing (7 Steps of Reconnaissance), and Windows Firewall.
3. **Verify Security Readiness:** An interactive 10-question evaluation engine providing real-time scoring, correct answer indicators, and detailed technical explanations.

---

## 🎯 Part 1 Scope & Boundary

> **Release Boundary:**
> This repository contains **ONLY Part 1** of the Cyber Security Assessment and Protection System.
> Future enterprise modules (LAN Security, Remote Network/VPN Security, VirtualBox sandboxes, advanced penetration tools) are strictly reserved for subsequent project phases.

### Active Protection Domains (10 Topics):
1. **Malware & Computer Viruses:** Infection mechanics, host dependency, Virus vs. Malware classification, Worms, Trojans, Spyware, Ransomware, and prevention protocols.
2. **Personal Computer & OS Security:** Defense in depth, Principle of Least Privilege, User Account Control (UAC), strong credential policies, real-time antivirus, safe browsing, and link inspection.
3. **Windows Update & Patch Management:** Vulnerability patching, security patches vs. feature updates, risks of unpatched software (exploits/CVEs), and step-by-step update procedures.
4. **Cyber Attacks:** Attack vectors and countermeasures for Phishing, Malware distribution, Password cracking (Brute Force/Dictionary), Social Engineering, and Denial of Service (DoS).
5. **Tailgating Physical Attack:** Physical social engineering mechanics, unauthorized entry scenarios, perimeter risks, and facility access controls (turnstiles, mantraps, badge policies).
6. **Ethical Hacking & 7 Steps of Reconnaissance:** Legal/authorized boundaries, defensive objectives, and the 7-step reconnaissance framework (Footprinting, Network Scanning, Port Scanning, Banner Grabbing, OS Fingerprinting, Enumeration, and Vulnerability Analysis).
7. **Windows Firewall:** Packet inspection rules, inbound vs. outbound traffic filtering, Windows Defender Firewall network profiles (Domain, Private, Public), and port isolation.
8. **Basic Security Assessment:** Interactive 5-checkpoint diagnostic questionnaire generating an endpoint security score (0–100) categorized into *Good*, *Moderate*, or *Needs Improvement*.
9. **Cyber Security Quiz:** 10-question multiple choice readiness test with automated grading, red/green answer highlighting, and technical explanations.
10. **About Part 1 Console:** Official release metadata and scope definition.

---

## 🚫 Excluded from Part 1 (Planned for Part 2)

- Local Area Network (LAN) Security
- Remote Network Security & Virtual Private Networks (VPN)
- VirtualBox Lab Environments & Sandboxing
- Advanced Penetration Testing Tools & Packet Analyzers

---

## 💻 Technology Stack

Pure standard web technologies designed to run completely offline without server or database dependencies:
- **HTML5:** Semantic architecture, accessible forms, cybersecurity dashboard layout.
- **CSS3:** Cybersecurity dark theme, CSS Grid & Flexbox, responsive layouts, console badges, and visual status chips.
- **JavaScript (ES6):** Vanilla JavaScript for real-time score calculation, dynamic quiz generation, answer verification, and active navigation tracking.

---

## 🚀 How to Run & Host the System

### Option 1: Instant Local Host Server (Runs on `http://localhost:8080/`)
Since Windows includes PowerShell natively (no Python or Node.js required):
- Simply double-click **`start-server.bat`** in the project folder!
- It automatically starts a local HTTP server and opens `http://localhost:8080/` in your browser.
- Alternatively, run this single command in PowerShell inside the folder:
  ```powershell
  powershell -ExecutionPolicy Bypass -File .\start-server.ps1
  ```

### Option 2: Direct Browser Launch (Offline)
- Double-click `index.html` to open directly in Chrome, Edge, or Firefox.
- Or run in PowerShell:
  ```powershell
  Start-Process "chrome.exe" "C:\Users\Tanish Waykar\.gemini\antigravity\scratch\cybersecurity-assessment-system\index.html"
  ```
