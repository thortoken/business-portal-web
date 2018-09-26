import React from 'react';

import { Button, Checkbox } from 'antd';

import './Welcome.css';

export class Welcome extends React.Component {
  state = {
    showTerms: true,
    showPrivacy: true,
    termsChecked: false,
    privacyChecked: false,
  }
  render() {
    return (
      <div className="Welcome">
        <div className="Welcome__register">
          <div className="img__wrapper">
            <img src="/images/Thor_sale-icon.png" />
            <div />
          </div>
          <div className="Welcome__msg">Welcome to Thor</div>
          <div className="Welcome__submsg">
            Please accept the terms and conditions and privacy policy to create your account.
          </div>
          {
            <div className="Welcome__boldmsg">
            Terms of Service
          </div>
          }

          {
            this.state.showTerms && <div className="Welcome__terms">Last updated: September 5, 2018

Please read these Terms and Conditions ("Terms") carefully before using the gothor.com or thortoken.com, thorpayments.com or any associated websites, APIs, or mobile applications (the “Thor Platform”) operated by Thor Technologies, Inc. (“Thor”, "us", "we", or "our").

Your access to and use of the Services (defined below) is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Services.

Some of the Services may be subject to our additional terms, conditions, agreements and schedules, which are posted on the Thor Platform or made available separately from these Terms (“Additional Terms”).  Your use of the Services may also be subject to our additional policies, guidelines or rules we also post or make available.  Such Additional Terms policies, guidelines and rules are incorporated into and form a part of these Terms.  If there is a conflict between these Terms and the Additional Terms, the Additional Terms will control.

By accessing or using the Services you agree to be bound by these Terms as well as our Privacy Policy and E-Sign Consent. If you disagree with any part of these Terms then you do not have permission to access the Services.

Consent to Doing Business Electronically

Because our platform operates on mobile devices and the Internet, you consent to transact business with us electronically.  Agreements you enter into with us are signed electronically.  We will provide disclosures, notices, alerts and communications to you by electronic means, for example, by posting it on our website, sending you an in-app message, emailing it to an email address that you have provided us, sending it as a text message to any mobile phone number that you have provided us, or making it available to you in your Thor Account (defined below).  All notices by any of these methods will be deemed received by you no later than the earlier of when received or 24 hours after sent or posted.

Who Can Use the Services

Only individuals 18 or older who can form a legally binding contract and can use the  Services, as well as business entities. We may impose other restrictions as well.

By using the Services on behalf of someone else, you affirm you have the authority to bind that person to these Terms, and that you will be bound to these Terms on behalf of that person.

Basic Thor Services

Your Thor Account encompasses the following basic services: A hosted digital currency wallet that allows users to store certain supported digital currencies ("Digital Currency"), and to track, transfer, and manage supported Digital Currencies (the "Hosted Digital Currency Wallet"); and a U.S. dollar wallet for use in connection with our payment services ("USD Wallet"); and the purchase of products and services when you visit or shop via our Thor Platform (collectively, the "Services").  Some of the Services may not be available generally, or more specifically to residents of certain jurisdictions.

Registration of Thor Account. In order to use the Services, you must register for a Thor account ("Thor Account"). During the registration process, we will ask you for certain information, including your name and other personal information, to verify your identity. We may, in our sole discretion, refuse to open a Thor Account for you, or limit the number of Thor Accounts that you may hold.

You may not use as a username the name of another person or that is not lawfully available for use, a name or trademark that is subject to any rights of another person other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.

Your username and password are for your personal use only, and not for use by any other person.  You are responsible for safeguarding your username and password, and agree not to transfer or lend them to anyone else.  You are responsible for all interaction with the Services that occurs with your username or password.  You agree to immediately notify us of any unauthorized use of your username or password or any other breach of security related to your Thor Account or the Services.  You agree to log out from your Thor Account (if applicable) at the end of each session.  We are not liable for any loss or damage arising from you not complying with any of your obligations in this paragraph.

Identity Verification. During registration of your Thor Account, you agree to provide us with the information we request for the purposes of identity verification and the detection of money laundering, terrorist financing, fraud, or any other financial crime and permit us to keep a record of such information. You will need to complete certain verification procedures before you are permitted to use the Services. Your access to one or more Services and the limits that apply to your use of the Services, may change as a result of information collected about you on an ongoing basis. The information we request may include certain personal information, including your name, address, telephone number, e-mail address, date of birth, taxpayer identification number, government identification, and information regarding your bank account (such as the name of the bank, the account type, routing number, and account number). In providing us with this or any other information that may be required, you confirm that the information is complete, accurate and up to date. You agree to keep us updated if any of the information you provide changes. You authorize us to make inquiries, whether directly or through third parties, that we consider necessary to verify your identity or protect you and/or us against fraud or other financial crime, and to take action we reasonably deem necessary based on the results of such inquiries. When we carry out these inquiries, you acknowledge and agree that your personal information may be disclosed to consumer reporting, fraud prevention, financial crime or other agencies and that these agencies may respond to our inquiries.  Additionally, we may require you to wait some amount of time after completion of a transaction before permitting you to use further Services and/or before permitting you to engage in transactions beyond certain volume limits. This includes authorizing your wireless carrier to use your mobile number, name, address, email, network status, customer type, customer role, billing type, mobile device identifiers (IMSI and IMEI) and other subscriber status details, if available, to allow verification of your identity and to compare information you have provided to Thor with your wireless carrier account profile information for the duration of the business relationship.

All customers wishing to use the Services are required to establish a Thor Account and must have their identity verified.  Individuals must provide the following information:

·         Date of birth

·         Physical address

·         Email address

·         Identification number

o    For a U.S. person:  Social Security Number

o    For a non-U.S. person: one or more of the following:

-     A taxpayer identification number;

-     Passport number and country of issuance;

-     Alien identification card number; and

-     Number and country of issuance of any other government-issued document evidencing nationality or residence and bearing a photograph or similar safeguard

·         Picture identification (i.e., passport, state driver's license, or state identification card)

·         Photo or a selfie from your webcam or mobile phone

·         Country of citizenship

·         Virtual wallet address

·         Employment

·         Income

·         Source of funds

·         Explanation of activity

Companies must provide the information we request.  We may require the individual information above for an individual who directly or indirectly holds 25% or more of the equity interests of the company or has managerial control of the company.

We may require you to provide additional information, verify your information, or wait some amount of time after completion of a transaction before permitting you to use any of the Services or engage in transactions beyond certain volume limits.

Hosted Digital Currency Wallet

Your Hosted Digital Currency Wallet enables you to store, track and manage  Digital Currencies contained in your Hosted Digital Currency Wallet and to purchase certain goods, products and services via the Thor Platform. You may be able to request, send and receive, and store Digital Currency from, third parties with a Thor Account and Hosted Digital Currency Wallet by giving instructions through your Thor Account (each such transaction is a "Digital Currency Transaction"). Depending on your location, certain Hosted Digital Currency Wallet functionality and Digital Currency Transactions may not be available.

"THOR" is our proprietary Thor Platform digital currency. The THOR digital currency represents a limited, non-transferable, non-exclusive license to use the features of the Thor Platform for personal use and does not represent a property interest of any kind. THOR has no value in real currency. We reserve the right to change the purchase price for THOR at any time to avoid the perception that it has a set, equivalent value in real currency. THOR is not returnable, exchangeable, or refundable, either for real currency or for real goods and services. THOR cannot be transferred, gifted, exchanged, or sold between users and you agree not to sell, transfer, or assist other users in selling or transferring virtual currency in any manner.

Thor reserves the right to refuse to process or cancel any pending Digital Currency Transaction or to impose transaction limits. Thor cannot reverse a Digital Currency Transaction which has been broadcast to a Digital Currency network or otherwise initiated. The Hosted Digital Currency Wallet Services are available only in connection with those Digital Currencies that Thor, in its sole discretion, decides to support. At this time, THOR is the only supported Digital Currency on the Thor Platform. Under no circumstances should you attempt to use your Hosted Digital Currency Wallet to store, send, request, or receive digital currencies in any form that are not supported by Thor. Thor assumes no responsibility or liability in connection with any attempt to use the Services for digital currencies that Thor does not support.

Thor processes Digital Currency according to the instructions received from you and we do not guarantee the identity of any receiver or other person. You should verify all transaction information prior to submitting instructions to Thor. You can only send Digital Currency to another user who has a Thor Account and Hosted Digital Currency Wallet.  Once submitted to a Digital Currency network, a Digital Currency Transaction will be unconfirmed for a period of time pending sufficient confirmation of the transaction by the Digital Currency network. A transaction is not complete while it is in a pending state. Digital Currency associated with transactions that are in a pending state will be designated accordingly, and will not be included in your Thor Account balance or be available to conduct transactions. Thor may charge network fees (miner fees) to process a Digital Currency transaction on your behalf. Thor will calculate the network fee in its discretion, although Thor will always notify you of the network fee at or before the time you authorize the transaction. Thor reserves the right to delay any Digital Currency Transaction if it perceives a risk of fraud, illegal activity or any other risk.

Thor does not store any private keys, backup phrases or passwords (collectively, “Private Key Information”). Private Key Information is stored locally in your local copy of the Thor Platform. It is very important that you backup your Private Key Information. If you lose your Private Key Information then it will not be possible for Thor to recover it for you and you may permanently lose access to your Digital Currency. You are responsible for maintaining adequate security and control of any and all IDs, passwords, hints, personal identification numbers, API keys or any other codes that you use to access the Services. Any loss or compromise of your information may result in unauthorized access to your Thor Account by third-parties and the loss or theft of any Digital Currency and/or funds held in your Thor Account and any associated accounts, including your linked bank accounts and credit cards. You are responsible for keeping your email address and telephone number up to date in your Thor Account Profile in order to receive any notices or alerts that we may send you. We assume no responsibility for any loss that you may sustain due to compromise of account login credentials or other information due to no fault of Thor and/or failure to follow or act on any notices or alerts that we may send to you. In the event you believe your Thor Account information has been compromised, contact Thor Support immediately at support@thorpayments.com.

Unless specifically announced on our website or through some other official public statement of Thor, we do not support metacoins, colored coins, side chains, or other derivative, enhanced, or forked protocols, tokens, or coins which supplement or interact with a Digital Currency supported by Thor (collectively, “Advanced Protocols”). Do not use your Thor Account to attempt to receive, request, send, store, or engage in any other type of transaction involving an Advanced Protocol. The Thor platform is not configured to detect and/or secure Advanced Protocol transactions and Thor assumes absolutely no responsibility whatsoever in respect to Advanced Protocols.

Thor does not own or control the underlying software protocols or blockchains which govern the operation of Digital Currencies we support. In general, the underlying protocols are open source and anyone can use, copy, modify, and distribute them. By using the Thor Platform, you acknowledge and agree (i) that Thor is not responsible for operation of the underlying protocols and that Thor makes no guarantee of their functionality, security, or availability; and (ii) that the underlying protocols are subject to sudden changes in operating rules (a/k/a “forks”), and that such forks may materially affect the value, function, and/or even the name of the Digital Currency you store in your Hosted Digital Currency Wallet. In the event of a fork, you agree that Thor may temporarily suspend Thor operations (with or without advance notice to you) and that Thor may, in its sole discretion, decide whether or not to support (or cease supporting) either branch of the forked protocol entirely. You acknowledge and agree that Thor assumes absolutely no responsibility whatsoever in respect of an unsupported branch of a forked protocol.

USD Wallet

General.  Thor offers a payment service that lets you send funds (U.S. dollars) to, or receive funds from, other users with a Thor Account and USD Wallet (“USD Payment Service”). You can pay for goods or services at certain merchants. In order to use our USD Payment Service, you will need to first sign up for a Dwolla Platform Account.

Dwolla Platform Account.  We have partnered with Dwolla, a payments provider company, to offer you the USD Payment Services. When you sign up for a Thor Account with us, you will also be prompted to sign up for a Dwolla account (called a "Dwolla Platform Account"). You authorize us to share any of your information with Dwolla needed to open and support your Dwolla Platform Account. It is your responsibility to make sure data you provide us is accurate and complete.

It is important you understand the nature of the two separate accounts underlying your Thor Wallet. Your Thor Wallet on our platform is the interface where you can manage your funds, while your funds are stored with Dwolla's financial institution partners until they are used for transactions.

In order to use the payment functionality of our application, you must open a Dwolla Platform Account provided by Dwolla, Inc. and you must accept the Dwolla Terms of Service and Privacy Policy. Any funds held in the Dwolla account are held by Dwolla's financial institution partners as set out in the Dwolla Terms of Service. You authorize us to share your identity and account data with Dwolla for the purposes of opening and supporting your Dwolla Platform Account, and you are responsible for the accuracy and completeness of that data. You understand that you will access and manage your Dwolla Platform Account through our application, and Dwolla account notifications will be sent by us, not Dwolla. We will provide customer support for your Dwolla account activity, and can be reached at www.gothor.com, support@thorpayments.com and/or 617-515-5067.

When you open a Dwolla Platform Account, you will link a checking or savings account from a bank. Once linked, you can load funds from the linked bank account to your Dwolla Platform Account. Any funds you load to the Dwolla Platform Account are placed in a pooled account held by one of Dwolla's financial institution partners. Be aware of the following about the pooled account:

•     It does not pay interest.

•     It is not eligible for FDIC insurance, individual insurance, or share insurance offered by the National Credit Union Share Insurance Fund.

•     If the financial institution partner enters into receivership, you may lose value.

When you send funds, receive funds, or make payments to merchants, Dwolla's financial institution partners will debit or credit your Dwolla Platform Account based on the instructions you send through Thor. Neither Thor nor Dwolla receive, hold, or transmit funds.

Thor (not Dwolla) will provide you with any and all notifications as well as all customer support related to the Dwolla Platform Account. Please contact us if you have any questions.

Special Offers and Services.  We may, at any time, provide special offers from select merchants to you and load these offers onto your Thor Account. We may also add to our USD Payment Services as we create new ways for you to use our platform.

We may offer a sign-up incentive for limited periods of time. If we do, we may stop offering this incentive at any time.

Account Balances.  You cannot use our USD Payment Services to send funds you don't have. When you initiate a transaction through your USD Wallet, you must have enough funds in your USD Wallet to support that transaction, or we will not permit it to go through.

You cannot have a negative balance in your USD Wallet and you cannot incur overdrafts.

Electronic Fund Transfers Through Dwolla Platform Account.  You can initiate the following electronic fund transfers ("EFTs" for short) through your USD Wallet:

•          Load funds to your Dwolla Platform Account from a bank account linked to your Dwolla Platform Account;

 •          Withdraw funds from your Dwolla Platform Account to your linked bank account; and

 •          Transfer funds from your Dwolla Platform Account to another Thor Account user’s Dwolla Platform Account.

•          Make purchases at participating merchants.

‍

Once the above EFTs are initiated through your USD Wallet, we pass along your payment instructions to Dwolla in order to complete the transaction. Dwolla sets transaction limits on these transfers, which you should review carefully in Dwolla's Terms of Service.

EFTs for Merchant Purchases; Limitations.  When you make a purchase at a participating merchant, you authorize an EFT that debits your Dwolla Platform Account. As above, we pass along your payment instructions to Dwolla in order to complete the transaction.

In addition to the limits set by Dwolla, noted above, we impose a transaction limit on purchases made at merchants.

Your Liability for Unauthorized EFTs.  Tell us AT ONCE if you believe your USD Wallet has been accessed without your permission or an EFT has been made from your USD Wallet without your permission. Email is the best way to keep your losses down. You could lose all the money in your USD Wallet.

You can email us at support@thorpayments.com, and you call us at 617-515-5067. Our mailing address is 1161 Mission St., San Francisco, CA 94103. Our business days are Monday through Friday, not including federal holidays.

If you tell us within 4 business days after you learn of the unauthorized access to your USD Wallet, you can lose no more than $50 if someone initiated an EFT without your permission.

If you do NOT tell us within 4 business days after you learn of the access, and we can prove we could have stopped someone from initiating an EFT without your permission if you had told us, you could lose up to $500.

Also, if your transaction history shows EFTs that you did not make, tell us at once. If you do not tell us within 90 days after the date of the transaction, and we can prove we could have stopped someone from taking the money if you had told us in time, you may not get back any money you lost after those 90 days. If a good reason (such as a long trip or a hospital stay) kept you from telling us, we will extend the time periods.

Transaction History.  You will be able to see your transaction history on your UD Wallet. We will not send you a periodic statement listing transactions you make on your USD Wallet. If you have any questions about these transactions, email us at support@thorpayments.com.

ALL QUESTIONS ABOUT TRANSACTIONS MADE WITH YOUR USD WALLET MUST BE DIRECTED TO US AND NOT TO DWOLLA OR ITS FINANCIAL INSTITUTION PARTNER THAT HOLDS YOUR FUNDS. We are responsible for the EFT service and for resolving any errors in transactions made with your USD Wallet.

Our Liability for EFTs.  If we do not complete an EFT to or from your USD Wallet on time or in the correct amount, we will be liable for your losses or damages. However, there are some exceptions. We will not be liable, for instance:

•     If, through no fault of ours, you do not have enough money in your Account to make the EFT.

•     If our system was not working properly and you knew about the breakdown when you started the EFT.

•     If circumstances beyond our control (such as fire or flood) prevent the EFT, despite reasonable precautions that we have taken.

•     There may be other exceptions to our liability stated in these Terms.

Disclosure of Your Information.  We will disclose information to third parties about your USD Wallet or the EFTs you make:

•     Where it is necessary for completing EFTs;

•     In order to verify the existence and condition of your USD Wallet for a third party, such as a credit bureau or merchant;

•     In order to comply with government agency or court orders; or

•     If you give us your permission.

Fees.

Thor reserves the right to charge fees for any Service offered under the Thor Platform.

You understand that your bank, Dwolla, and merchants may charge you fees. You should carefully review Dwolla's Terms of Service to determine if you will be subject to any of their fees.

Error Resolution

EFT Error Resolution.  Contact us immediately at support@thorpayments.com or if you think that: (i) your USD Wallet has been accessed without your authorization, (ii) a transaction that you did not authorize has occurred, (iii) a transaction has been processed incorrectly to or from your USD Wallet, or (iv) your transaction history contains an error. If you give someone access to your USD Wallet and that person conducts transactions without your authorization, these transactions are not considered errors, unless you are the victim of a phishing attack or similar exploit.

We must hear from you within 90 days after the date of the suspected error. We may extend this period by a reasonable time if you are delayed because you initially attempted to notify the financial institution that holds your funds.

When you notify us of the suspected error, please provide:

•     Your name and email address;

•     The nature of the suspected error and why you believe it is an error; and

•     The dollar amount of the suspected error.

We will determine whether an error occurred within 10 business days after you notify us and will correct any error promptly. If we need more time, we may take up to 45 days to investigate. If we decide to take extra time, we will provisionally credit your USD Wallet within 10 business days for the amount of the suspected error. If we ask you to send your inquiry by email and we do not receive it within 10 business days, we may not credit your USD Wallet. For errors involving new USD Wallets, we may take up to 90 days to investigate and up to 20 business days to credit your USD Wallet.

We will tell you the results within 3 business days after completing our investigation. If we decide there was no error, we will reverse any provisional credits and will provide you with a written explanation. You may ask for copies of the documents we used in our investigation.

All Other Errors.  If you believe there is some transaction error that does not involve an EFT, contact us within 4 business days of the transaction. If you do not contact us within 4 business days, we will not be liable for any loss.

Cancellation and Refunds.  As a general rule, we do not cancel or reverse transactions, including EFTs. If you want to cancel an EFT you initiated within the past 30 minutes, please contact us immediately.

Also, we do not provide refunds. If you want a refund, please contact the merchant who received your payment.

Purchases with Merchants.  You may purchase goods or services at participating merchants. When you make these purchases, you authorize a debit from your Dwolla Platform Account in the amount of the purchase.

Other Purchases

USD Purchases. If you wish to purchase any product or service made available through the Services ("Purchase"), you may be asked to supply certain information relevant to your Purchase, including your debit or credit card number, the expiration date of your card, your billing address, and your shipping information.

You represent and warrant that: (i) you have the legal right to use any credit card, debit card or other payment method in connection with any Purchase; and that (ii) the information you provide is true, correct and complete.

Returns.  You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your items must be unused and in the same condition that you received it. Your item must be in the original packaging. Damaged or defective merchandise may also be returned for a replacement of the exact item. Replacement orders will ship once the return of the original item is received and processed at our warehouse.

Refunds:  If your return is approved, we will initiate a refund to your credit card (or original method of payment).  You will receive the credit within a certain amount of days, depending on your card issuer’s policies.

Shipping:  You will be responsible for paying for your own shipping costs for returning your item.  Shipping costs are non-refundable.  If you receive a refund, the cost of return shipping will be deducted from your refund.

Digital Currency Purchases. Purchases paid with Digital Currency cannot be combined with any other form of payment.

Final.  Digital Currency transactions are final. Once you send Digital Currency funds to our designated account, the transaction cannot be reversed. This is a core feature of Digital Currency.

U.S. Dollars.  All Digital Currency transactions are communicated in USD. The exchange rate will be determined by us at our sole discretion, at the time of purchase (the “Digital Currency Exchange Rate”). This exchange rate is valid for up to 10 minutes. If the payment is not completed during this time, you may be provided with a new exchange rate. Digital Currency is only accepted by the domestic (US) version of the Thor Mobile Application.

Returns. You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your items must be unused and in the same condition that you received it. Your item must be in the original packaging. Returned orders qualify for a refund in Digital Currency. The refund will be issued for the full USD value of the order and processed at the Digital Currency exchange rate when the refund is completed. Your refund will be issued through the Thor Mobile Application using the Hosted Digital Currency Wallet address listed on your Thor Account. Damaged or defective merchandise may also be returned for a replacement of the exact item. Replacement orders will ship once the return of the original item is received, approved and processed at our warehouse.

Shipping.   You will be responsible for paying for your own shipping costs for returning your item.  Shipping costs are non-refundable.  If you receive a refund, the cost of return shipping will be deducted from your refund.

Cancelled Orders. Cancelled orders also qualify for a refund in Digital Currency. A refund will be issued for the full USD value of the order and processed at the Digital Currency Exchange Rate when the refund is completed. Your refund will be issued through the Thor Mobile Application using the Hosted Digital Currency Wallet address listed on your Thor Account.

The Services may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.

We reserve the right to refuse or cancel your order at any time for reasons including to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.

We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.

We may use a third party payment provider to process any USD payment between you and Thor, including in relation to your use of the Services or deposits or withdrawals from your Hosted Digital Currency Wallet.

Right to Stop Transactions

We may stop any of your transactions if we have reason to believe there may be suspicious activity involved or for any other reason so long as we are not prohibited by law.

Availability, Errors and Inaccuracies

We are constantly updating product and service offerings. We may experience delays in updating information on the Services and in our advertising on other websites. The information found on the Services may contain errors or inaccuracies and may not be complete or current. Products or services may be mispriced, described inaccurately, or unavailable on the Services and we cannot guarantee the accuracy or completeness of any information found on the Services.

We therefore reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.

Contests, Sweepstakes and Promotions

Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the Services may be governed by rules that are separate from these Terms. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms, the Promotion rules will apply.

Mobile Use

The Services include certain services that are available via a mobile device, including (i) the ability to upload content to the Services via a mobile device, (ii) the ability to browse the Services and our website from a mobile device and (iii) the ability to access certain features through an application downloaded and installed on a mobile device (collectively, the “Mobile Use”). To the extent you access the Services through a mobile device, your wireless service carrier’s standard charges, data rates and other fees may apply.  In addition, downloading, installing or certain aspects of Mobile Use may be prohibited or restricted by your carrier, and not all aspects of Mobile Use may work with all carriers or devices. You consent to be contacted by us, our contractors, agents, representatives, affiliates, or anyone calling on our behalf for any and all purposes, at any telephone number, or physical or electronic address you provide or numbers we can reasonably associate with your Thor Account (through skip trace, caller ID capture or other means). You agree we may contact you in any way, including SMS messages (text messages), calls using prerecorded messages or artificial voice, and calls and messages delivered using auto telephone dialing system or an automatic texting system. Automated messages may be played when the telephone is answered, whether by you or someone else. In the event that a contractor, agent, representative or other person calls, he or she may also leave a message on your answering machine, voice mail, or send one via SMS message.  You represent that the telephone numbers that you provide to us are your numbers and not someone else's. You represent that you are permitted to receive calls at each of the telephone numbers you have provided to us. You agree to alert us whenever you stop using a particular telephone number.  You also understand that you may incur additional charges for such communications from your carrier.

Intellectual Property

The Services and their original content, features and functionality are and will remain the exclusive property of Thor Technologies, Inc. and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.

Links To Other Websites

The Services may contain links to third party websites or services that are not owned or controlled by us.

We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third party websites or services. We do not warrant the offerings of any of any other person or website.

You acknowledge and agree that we are not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party websites or services.

We strongly advise you to read the terms and conditions and privacy policies of any third party websites or services that you visit.

Termination

We may terminate or suspend your Thor Account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including a breach of the Terms.

If you wish to terminate your Thor Account, you may simply discontinue using the Services, but any obligations you have relating to your Thor Account and any provisions of these Terms which by their nature should survive termination will survive termination, including ownership provisions, warranty disclaimers, indemnity and limitations of liability.

Indemnification

You agree to defend, indemnify and hold harmless Thor Technologies, Inc., its affiliates and each of their owners, directors, managers, officers, employees, contractors, agents, licensees and licensors from and against any and all claims, damages, obligations, losses, liabilities, judgments, settlements, penalties, fines, debts, costs, fees and expenses (including attorney's fees), resulting from or arising out of (i) your use and access of the Services, by you or any person using your Thor Account, username or password, or (ii a breach of these Terms.

Setoff

If you owe us any amount, you give us a security interest in your Thor Account and Hosted Digital Currency Wallet and your Digital Currency in your Hosted Digital Currency Wallet and funds held in any pooled account (does not include your Dwolla Platform Account). You also give us the right, to the extent not prohibited by law, to set off against your Digital Currency and funds to pay the amount owed to us. You agree that the security interest you have given us is consensual and is in addition to our right of set off. If we exercise our right of set off, we will notify you to the extent required by law. Notwithstanding the foregoing, nothing herein shall supersede the terms of the Dwolla Terms of Service.

Limitation Of Liability

In no event will Thor Technologies, Inc., its affiliates and each of their owners, directors, managers, officers, employees, contractors, agents, licensees and licensors be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.

We will not bear any liability, whatsoever, for any damage or interruptions caused by any computer viruses, spyware, scareware, Trojan horses, worms or other malware that may affect your mobile device, computer or other equipment, or any phishing, spoofing or other attack. We advise the regular use of a reputable and readily available virus screening and prevention software. You should also be aware that SMS and email services are vulnerable to spoofing and phishing attacks and should use care in reviewing messages purporting to originate from us. Always log into your Thor Account through the Thor Mobile Application to review any transactions or required actions if you have any uncertainty regarding the authenticity of any communication or notice.

Disclaimer

Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.

We do not warrant that (i) the Services will function uninterrupted, secure or available at any particular time or location; (ii) any errors or defects will be corrected; (iii) the Services are free of viruses or other harmful components; or (d) the results of using the Services will meet your requirements.

Exclusions

Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.

Restricted Use

By opening a Thor Account, you confirm that you will not use the Services in connection with any of following businesses, activities, practices, or items:

·         Investment and Credit Services.  Securities brokers; mortgage consulting or debt reduction services; credit counseling or repair; real estate opportunities; investment schemes.

·         Restricted Financial Services.  Check cashing, bail bonds; collections agencies.

·         Intellectual Property or Proprietary Rights Infringement.  Sales, distribution, or access to counterfeit music, movies, software, or other licensed materials without the appropriate authorization from the rights holder.

·         Counterfeit or Unauthorized Goods.  Unauthorized sale or resale of brand name or designer products or services; sale of goods or services that are illegally imported or exported or which are stolen.

·         Regulated Products and Services.  Marijuana dispensaries and related businesses; sale of tobacco, e-cigarettes, and e-liquid; online prescription or pharmaceutical services; age restricted goods or services; weapons and munitions; gunpowder and other explosives; fireworks and related goods; toxic, flammable, and radioactive materials; products and services with varying legal status on a state-by-state basis.

·         Drugs and Drug Paraphernalia.  Sale of narcotics, controlled substances, and any equipment designed for making or using drugs, such as bongs, vaporizers, and hookahs.

·         Pseudo-Pharmaceuticals.  Pharmaceuticals and other products that make health claims that have not been approved or verified by the applicable local and/or national regulatory body.

·         Substances designed to mimic illegal drugs.  Sale of a legal substance that provides the same effect as an illegal drug (e.g., salvia, kratom).

·         Adult Content and Services.  Pornography and other obscene materials (including literature, imagery and other media); sites offering any sexually-related services such as prostitution, escorts, pay-per view, adult live chat features.

·         Multi-level Marketing.  Pyramid schemes, network marketing, and referral marketing programs.

·         Unfair, predatory or deceptive practices.  Investment opportunities or other services that promise high rewards; Sale or resale of a service without added benefit to the buyer; resale of government offerings without authorization or added value; sites that we determine in our sole discretion to be unfair, deceptive, or predatory towards consumers.

·         High risk businesses.  any businesses that we believe poses elevated financial risk, legal liability, or violates card network or bank policies.

Conditional Use

Express written consent and approval from Thor and Dwolla must be obtained prior to using the Services for the following categories of business and/or use ("Conditional Uses"). Consent may be requested by contacting us at support@thorpayments.com. Thor and Dwolla may also require you to agree to additional conditions, make supplemental representations and warranties, complete enhanced on-boarding procedures, and operate subject to restrictions if you use Services in connection with any of following businesses, activities, or practices:

·         Money Services.  Money transmitters, Digital Currency transmitters; currency or Digital Currency exchanges or dealers; gift cards; prepaid cards; sale of in-game currency unless the merchant is the operator of the virtual world; act as a payment intermediary or aggregator or otherwise resell any of the Services.

·         Charities.  Acceptance of donations for nonprofit enterprise.

·         Games of Skill.  Games which are not defined as gambling under the Terms or by law, but which require an entry fee and award a prize.

·         Religious/Spiritual Organizations.  Operation of a for-profit religious or spiritual organization.

Waiver; Severability

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding the Services, and supersede and replace any prior agreements we might have had between us regarding the Services.

Changes

We may change these Terms at any time in our sole discretion. If required by law, we will provide notice prior to the change taking effect.

By continuing to access or use the Services after any changes become effective, you agree to be bound by the changed Terms. If you do not agree to the new Terms, you are no longer authorized to use the Services.

Privacy of Others; Marketing

If you receive information about another user through the Services, you must keep the information confidential and only use it in connection with the Services. You may not disclose or distribute a user's information to a third party or use the information except as reasonably necessary to effectuate a transaction and other functions reasonably incidental to the transaction such as support, reconciliation and accounting unless you receive the user's express consent to do so. You may not send unsolicited email to a user through the Services.

Assignment

You may not assign any rights or obligations under these Terms. We reserve the right to assign our rights and obligations without restriction, including to any affiliate or subsidiaries or other person. Any assignment by you in violation of this section is null and void. these Terms will bind and inure to the benefit of the parties, their successors and permitted assigns.

Dispute Resolution

Governing Law

These Terms will be governed according to the laws of the State of California, and all activities performed in connection with the Services will be deemed to have been performed in California. Any controversy, dispute, or claim arising out of or relating to the Services or these Terms will be governed by and construed in accordance with the laws of California, except the provisions concerning conflicts of law.

Disputes

If a dispute arises between you and Thor, our goal is to learn about and address your concerns, so please contact us at support@thorpayments.com.

Arbitration

THIS SECTION AFFECTS YOUR RIGHTS. PLEASE READ CAREFULLY BEFORE AGREEING TO THESE TERMS.

To resolve disputes in the most expedient and cost effective manner, you and Thor agree that any dispute arising in connection with the Services will be resolved by binding arbitration. Arbitration is more informal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, may allow for more limited discovery than in court, and can be subject to very limited review by courts. Arbitrators can award the same damages and relief that a court can award. Our agreement to arbitrate disputes includes all claims arising out of or relating to any aspect of the Services, whether based in equity, contract, tort, statute, fraud, misrepresentation or any other legal theory, and regardless of whether the claims arise during or after the termination of the Services.

YOU UNDERSTAND THAT, BY AGREEING TO THESE TERMS, YOU AND THOR ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION IN COURT OR IN ARBITRATION.

We both agree that nothing in these Terms will be deemed to waive, preclude, or otherwise limit either of our right to (I) bring an individual action in small claims court, or (II) pursue enforcement actions through applicable federal, state, or local agencies where such actions are available.

Any arbitration between you and Thor will be governed by the Commercial Dispute Resolution Procedures and the Supplementary Procedures for Consumer Related Disputes of the American Arbitration Association ("AAA Rules"). The AAA Rules and filing forms are available online at www.adr.org, or by calling the AAA at 1-800-778-7879. Your arbitration filing fees will be governed by the AAA Rules. If it is determined by the arbitrator that you cannot afford such fees, we will pay all arbitration fees and expenses.

Any arbitration hearings will take place in San Francisco, California, provided that if the claim is for $10,000 or less, you may choose whether the arbitration will be conducted (i) solely on the basis of documents submitted to the arbitrator; (ii) through a nonappearance based telephonic hearing; or (iii) by an in-person hearing as established by the AAA Rules.

YOU AND THOR AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.

You agree that the enforceability of these arbitration provisions will be determined by the arbitrator as provided in the AAA Rules. You agree that the arbitration provisions of these Terms in effect at the time of demand or action, and not the time of your or our alleged injury, will be the provisions that will be applied by the arbitrator or a court.

Contact Us

If you have any questions about these Terms, please contact us at support@thorpayments.com.

E-SIGN DISCLOSURE AND CONSENT

Electronic Delivery of Communications

You agree and consent to receive electronically all communications, agreements, documents, notices and disclosures (collectively, "Communications") that we provide in connection with your Thor Account and your use of the Services. Communications include:

·         Terms of use and policies you agree to (e.g., the Thor User Agreement and Privacy Policy), including updates to these agreements or policies;

·         Account details, history, transaction receipts, confirmations, and any other Account or transaction information;

·         Legal, regulatory, and tax disclosures or statements we may be required to make available to you;

·         Responses to claims or customer support inquiries filed in connection with your Account; and

·         Any other Communication.

We will provide these Communications to you by posting them on the Thor Platform, providing them in your Thor Account, emailing them to you at the primary email address listed in your Thor profile, communicating to you via instant chat, and/or through other electronic communication such as text message or mobile push notification.

Hardware and Software Requirements

In order to access and retain electronic Communications, you will need the following computer hardware and software:

·         A device with an Internet connection;

·         A current web browser that includes 128-bit encryption (e.g. Internet Explorer version 9.0 and above, Firefox version 3.6 and above, Chrome version 31.0 and above, or Safari 7.0 and above) with cookies enabled;

·         A valid email address (your primary email address on file with Thor); and

·         Sufficient storage space to save past Communications or an installed printer to print them.



How to Withdraw Your Consent

You may withdraw your consent to receive Communications electronically by contacting us at Thor support@thorpayments.com. If you fail to provide or if you withdraw your consent to receive Communications electronically, Thor reserves the right to immediately close your Thor Account or charge you additional fees for paper copies.

Requesting Paper Copies of Electronic Communications

You may request that we send you a paper copy of Communications via U.S. Mail. To request a paper copy, contact us at support@thorpayments.com. You must provide your current U.S. mailing address so we can process this request. We may charge you a reasonable fee not to exceed $10 per copy. Except as prohibited by law, we reserve the right, in our sole discretion, to deny your request.

Updating your Information

It is your responsibility to provide us with a true, accurate and complete e-mail address and your contact information, and to keep such information up to date. You understand and agree that if Thor sends you an electronic Communication but you do not receive it because your primary email address on file is incorrect, out of date, blocked by your service provider, or you are otherwise unable to receive electronic Communications, Thor will be deemed to have provided the Communication to you.

You may update your information by logging into your account and visiting settings or by contacting our support team at support@thorpayments.com.</div>
  }
        <div className="Welcome__termscheckbox">
          <Checkbox onChange={this.onTermsChecked} checked={this.state.termsChecked} /> I accept Thor and Dwolla's ToS
        </div>

        {
            <div className="Welcome__boldmsg">
            Privacy Policy
          </div>
          }

          {
            !this.state.privacyChecked && <div className="Welcome__terms">Last updated: September 19, 2018

Thor Technologies, Inc, ("Thor", "we", "us" and "our") respects and protects the privacy of visitors to our websites and our customers who use our services. To ensure transparency this Privacy Policy describes our information handling practices when you access our website located at www.gothor.com and/or when you use the Thor mobile app or third party applications relying on such an API, and related services (referred to collectively hereinafter as "Services").

Please take a moment to read this Privacy Policy carefully. If you have any questions about this Privacy Notice, please contact us at support@thortoken.com.

ACCEPTANCE OF PRIVACY POLICY
By accessing and using our Services, you signify acceptance to the terms of this Privacy Policy and consent to the collection, use, and disclosure of your personal information as described below. If you do not agree with or you are not comfortable with any aspect of this Privacy Policy, you should immediately discontinue access or use of our Services.

CHANGES TO THIS PRIVACY POLICY
We reserve the right to modify this Privacy Policy at any time, and when required by law, we will notify you of changes to this Privacy Policy. If we make any material changes we will notify you by email (sent to the e-mail address specified in your account) or by means of a notice on our Services prior to the change becoming effective.

Thor may provide additional "just-in-time" disclosures or additional information about the data collection, use and sharing practices of specific Services. These notices may supplement or clarify Thor's privacy practices or may provide you with additional choices about how Thor processes your personal information.

THE PERSONAL INFORMATION WE COLLECT
Personal information is data that can be used to identify you directly or indirectly, or to contact you. Our Privacy Policy covers all personal information that you voluntarily submit to us and that we obtain from our partners. This Privacy Policy does not apply to anonymized data as it cannot be used to identify you.

Except as described in this Privacy Policy, Thor will not give, sell, rent or loan any personal Information to any third party.

We collect personal information to provide you with our Services. When we require certain personal information from users it is because we are required by applicable law to collect this information or it is relevant for specified purposes. Any information you provide to us that is not required is voluntary. You are free to choose whether to provide us with the types of personal information requested, but we may not be able to serve you as effectively or offer you all of our Services when you do choose not to share certain information with us.

For example, we collect personal information which is required under the law to open an account, add a payment method, or execute a transaction. We also collect personal information when you use or request information about our Services, subscribe to marketing communications, request support, complete surveys, or sign up for a Thor event. We may also collect personal information from you offline, such as when you attend one of our events, or when you contact customer support. We may use this information in combination with other information we collect about you, as set forth in this Notice.

Here are some specific examples of the types of personal information Thor may collect and how we may use it:

When you create an account or use Thor Services, we, or our affiliates vendors acting on our behalf may collect the following types of information to meet our legal obligations: your name, date of birth, social security number, driver number ID, personal ID, address, phone, email, full bank account details and/or credit card numbers that you link to your Thor account or input when you use Thor Services. Thor will use this information to fulfill your requests and provide the relevant Services.
If you seek permissions to raise Digital Currency buy and sell limits associated with your Thor Account, we may require you to provide additional information which we may use in collaboration with service providers acting on our behalf to verify your identity or address, and/or to manage risk as required under applicable law. This information may include your date of birth, taxpayer or government identification number, a copy of your government-issued identification, or other personal information. We may also obtain information about you from third parties such as credit bureaus and identity verification services.
Whenever you contact us or respond to our communications (e.g., email, telephone, written), we receive your contact information and any other personal information you choose to provide us. Thor will use such information to fulfill your requests or to provide services.
You may choose to provide us with access to certain personal information stored by third parties such as social media sites (such as Facebook and Twitter). The information we have access to varies by site and is controlled by your privacy settings on that site and your authorization.


In addition, we may collect personal information disclosed by you on our message boards, chat features, blogs and our other services to which you are able to post information and materials. Any information that is disclosed in those forums becomes public information and may therefore appear in public ways, such as through search engines or other publicly available platforms, and may be "crawled" or searched by third parties. It could also be read, collected or used by other users to send you unsolicited messages. Please do not post any information that you do not want to reveal to the public at large.

HOW YOUR PERSONAL INFORMATION IS USED
Our primary purpose in collecting personal information is to provide you with a secure, smooth, efficient, and customized experience. In general, we use personal information to create, develop, operate, deliver, and improve our Services, content and advertising, and for loss prevention and anti-fraud purposes. Examples of how we may use this information include:

To comply with our legal obligations.
To prevent and investigate potentially prohibited or illegal activities, and/or violations of our posted user terms.
To process transactions and send notices about your transactions.
To verify your identity by comparing your personal information against third-party databases.
To send administrative or account-related information to you.
To enforce our agreements with third parties.
To resolve disputes, collect fees, and troubleshoot problems.
For quality control and staff training.
To enhance security, monitor and verify identity or service access, combat spam or other malware or security risks.
To provide you with Thor Services and customer support that you request.
To better understand our customers and end-users and the way they use and interact with Thor Services.
To provide a personalized experience, and implement the preferences you request.
To communicate with you about our events or our partner events.
To customize, measure, and improve Thor Services and the content and layout of our website and applications.
To deliver targeted marketing, service update notices, and promotional offers based on your communication preferences (where this in accordance with the law).


We will not use your personal information for purposes other than those purposes we have disclosed to you, without your permission. From time to time we may request your permission to allow us to share your personal information with third parties. You may opt out of having your personal information shared with third parties, or from allowing us to use your personal information for any purpose that is incompatible with the purposes for which we originally collected it or subsequently obtained your authorization. If you choose to so limit the use of your personal information, certain features or Thor Services may not be available to you.

INFORMATION FROM THIRD PARTY SOURCES
From time to time, we may obtain information about you from third party sources as required or permitted by applicable law, such as public databases, credit bureaus, ID verification partners, resellers and channel partners, joint marketing partners, and social media platforms.

Public Databases, Credit Bureaus & ID Verification Partners

We obtain information about you from public databases and ID verification partners for purposes of verifying your identity. ID verification partners use a combination of government records and publicly available information about you to verify your identity. Such information includes your name, address, job role, public employment profile, credit history, status on any sanctions lists maintained by public authorities, and other relevant data. We obtain such information to comply with our legal obligations, such as anti-money laundering laws. In some cases, we may process additional data about you based on public interest grounds to ensure our Services are not used fraudulently or for other illicit activities.

Resellers, Channel Partners, Joint Marketing Partners, and Social Media Platforms

We collect information about your publicly available social media profile, interests or preferences, and page-view information from some business partners with which we operate co-branded services or joint offerings. There are multiple purposes for collecting this information. First, we process such information to better understand you and/or maintain and improve the accuracy of the records we hold about you as well as to position, promote or optimize our Services. In addition, we may also use this information in conjunction with your browsing habits / preferences (as obtained from our data partners) and your contact details, professional information and Thor transaction history to deliver targeted advertising and marketing to you, where permitted by applicable law and in accordance with your advertising / marketing preferences. Second, we also process such information to provide support to you as part of our contractual obligations to you. Lastly, we process such information in the public interest because it helps us monitor, prevent and detect fraud.

Once we obtain such information from third parties, we do not subsequently share it with any other third parties except as described in this Policy. This information is shared with Thor's processors and corporate group as necessary to perform the Services.

WHY WE SHARE PERSONAL INFORMATION WITH OTHER PARTIES
We take care to allow your personal information to be accessed only by those who really need to in order to perform their tasks and duties, and to share with third parties who have a legitimate purpose for accessing it. Thor will never sell or rent your personal information. We will only share your information in the following circumstances:

We share your information with third party identity verification services in order to prevent fraud. This allows Thor to confirm your identity by comparing the information you provide us to public records and other third party databases. These service providers may create derivative data based on your personal information that can be used solely in connection with provision of identity verification and fraud prevention services.
Thor may use Dwolla Inc., ("Dwolla") to provide certain payment services and to verify your Dwolla Platform Account balance prior to approving a transaction. Thor only shares your information with Dwolla in accordance with this Privacy Policy. Information shared with Dwolla is treated by Dwolla in accordance with its Privacy Policy, at https://www.dwolla.com/legal/privacy/.
We may share your information with service providers under contract who help with parts of our business operations such as bill collection, marketing, health insurance providers and technology services. Our contracts require these service providers to only use your information in connection with the services they perform for us, and prohibit them from selling your information to anyone else.
We share your information with financial institutions with which we partner to process payments you have authorized.
We may share your information with companies or other entities that we plan to merge with or be acquired by. Should such a combination occur, we will require that the new combined entity follow this Privacy Policy with respect to your personal information. You will receive prior notice of any change in applicable policies.
We may share your information with companies or other entities that purchase Thor assets pursuant to a court-approved sale under U.S. Bankruptcy law;
We may share your information with law enforcement, and officials, or other third parties when we are compelled to do so by a subpoena, court order, or similar legal procedure, or when we believe in good faith that the disclosure of personal information is necessary to prevent physical harm or financial loss, to report suspected illegal activity or to investigate violations of our User Agreement or any other applicable policies..
If you establish a Thor account indirectly on a third party website or via a third party application, any information that you enter on that website or application (and not directly on a Thor website) will be shared with the owner of the third party website or application and your information will be subject to their privacy policies.

HOW PERSONAL INFORMATION IS SHARED WITH THIRD-PARTY SITES AND SERVICES

If you use your Thor Account to transfer Digital Currency in connection with the purchase or sale of goods or services, we or you may also provide the seller with your shipping address, name, and/or email to help complete your transaction with the seller. The seller is not allowed to use this information to market their services to you unless you have agreed to it. If an attempt to transfer Digital Currency to your seller fails or is later invalidated, we may also provide your seller with details of the unsuccessful transfer. To facilitate dispute resolutions, we may provide a buyer with the seller's address so that goods can be returned to the seller.

In connection with a Digital Currency transfer between you and a third party, including merchants, a third party may share information about you with us, such as your email address or mobile phone number which may be used to inform you that a transfer has been sent to or received from the third party. We may use this information in connection with such transfers to confirm that you are a Thor customer, that Digital Currency transfers are enabled, and/or to notify you that you have received Digital Currency. If you request that we validate your status as a Thor customer with a third party, we will do so. You may also choose to send Digital Currency to or request Digital Currency from an email address. In such cases, your user name will be displayed in an email message notifying the user of the designated email address of your action.

Please note that merchants you interact with may have their own privacy policies, and Thor is not responsible for their operations, including, but not limited to, their information practices. Information collected by third parties, which may include such things as contact details or location data, is governed by their privacy practices. We encourage you to learn about the privacy practices of those third parties.

If you authorize one or more third-party applications to access your Thor Account, then information you have provided to Thor may be shared with those third parties. Unless you provide further authorization, these third parties are not allowed to use this information for any purpose other than to facilitate your transactions using Thor Services.

HOW WE PROTECT AND STORE PERSONAL INFORMATION
We understand how important your privacy is, which is why Thor maintains (and requires its service providers to maintain) appropriate physical, technical and administrative safeguards to protect the security and confidentiality of the personal information you entrust to us.

We may store and process all or part of your personal and transactional information, including certain payment information, such as your encrypted bank account and/or routing numbers, in the United States and elsewhere in the world where our facilities or our service providers are located. We protect your personal information by maintaining physical, electronic, and procedural safeguards in compliance with the applicable laws and regulations.

For example, we use computer safeguards such as firewalls and data encryption, we enforce physical access controls to our buildings and files, and we authorize access to personal information only for those employees who require it to fulfill their job responsibilities. Full credit card data is securely transferred and hosted off-site by a payment vendor in compliance with Payment Card Industry Data Security Standards (PCI DSS). This information is not accessible to Thor's staff.

However, we cannot guarantee that loss, misuse, unauthorized acquisition, or alteration of your data will not occur. Please recognize that you play a vital role in protecting your own personal information. When registering with our Services, it is important to choose a password of sufficient length and complexity, to not reveal this password to any third-parties, and to immediately notify us if you become aware of any unauthorized access to or use of your account.

Furthermore, we cannot ensure or warrant the security or confidentiality of information you transmit to us or receive from us by Internet or wireless connection, including email, phone, or SMS, since we have no way of protecting that information once it leaves and until it reaches us. If you have reason to believe that your data is no longer secure, please contact us at the email address, mailing address or telephone number listed at the end of this Privacy Policy.

INTERNATIONAL TRANSFERS OF PERSONAL INFORMATION
As a global entity, Thor may store, transfer, and otherwise process your personal information in countries outside of the country of your residence, including the United States and possibly other countries.

Thor participates in and has certified its compliance with the EU-U.S. Privacy Shield Framework. Thor is committed to subjecting all personal information received from European Union (EU) member countries, in reliance on the Privacy Shield Framework, to the Framework’s applicable Principles. To learn more about the Privacy Shield Framework, visit the U.S. Department of Commerce’s Privacy Shield List at https://www.privacyshield.gov.

Thor is responsible for the processing of personal information it receives under the Privacy Shield Framework and subsequently transfers to a third party acting as an agent on its behalf. Pursuant to the Privacy Shield Principles, Thor will use personal information only in ways that are compatible with the purposes for which it was collected or subsequently authorized by the individual. We will take all reasonable steps to ensure that personal information we process is limited to only what is relevant to the purposes for which it was collected and that it is accurate, complete, and up-to-date.

Thor complies with the Privacy Shield Principles for all onward transfers of personal information from the EU, including the onward transfer liability provisions. Consequently, before Thor shares your information with any third party that is not also certified under the E.U.-U.S. Privacy Shield Framework, Thor, Inc. will enter into a written agreement that the third party provides at least the same level of privacy safeguard as required under those Frameworks, and assures the same level of protection for the personal information as required under applicable data protection laws.

Thor, Inc. commits to resolve European data subjects' complaints about their privacy and our collection, use or disclosure of their personal information in compliance with the EU-U.S. Privacy Shield Principles. European data subjects with inquiries or complaints regarding this Privacy Policy should first contact Thor at support@thorpayments.com.

If you are a European data subject with an unresolved complaint or dispute arising under the requirements of the Privacy Shield Framework, we agree to refer your complaint under the Framework to an independent dispute resolution mechanism. Our independent dispute resolution mechanism is the International Centre for Dispute Resolution ("ICDR"), operated by the American Arbitration Association ("AAA"). For more information and to file a complaint, you may contact the International Centre for Dispute Resolution by phone at +1.212.484.4181, or by visiting the website http://info.adr.org/safeharbor.

We are also subject to the investigatory and enforcement powers of the U.S. Federal Trade Commission with respect to the Framework. Please note that if your complaint is not resolved through these channels, under limited circumstances, a binding arbitration option may be available before a Privacy Shield Panel. In certain situations, Thor may be required to disclose personal information in response to lawful requests by public authorities, including to meet national security or law enforcement requirements.

HOW YOU CAN ACCESS OR CHANGE YOUR PERSONAL INFORMATION
You are entitled to review, correct, or amend your personal information, or to delete that information where it is inaccurate. You may do this at any time by logging in to your account and clicking the Profile or My Account tab. This right shall only be limited where the burden or expense of providing access would be disproportionate to the risks to your privacy in the case in question, or where the rights of persons other than you would be violated.

If you close your Thor account, we will mark your account in our database as "Closed," but will keep your account information in our database for a period of time described above. This is necessary in order to deter fraud, by ensuring that persons who try to commit fraud will not be able to avoid detection simply by closing their account and opening a new account. However, if you close your account, your personal information will not be used by us for any further purposes, nor sold or shared with third parties, except as necessary to prevent fraud and assist law enforcement, as required by law, or in accordance with this Privacy Policy.

RETENTION OF PERSONAL INFORMATION
We store our customers' personal information securely throughout the life of the customer's Thor Account. Thor will retain your personal information for a minimum of five years or as necessary to comply with our legal obligations or to resolve disputes.

COLLECTION & USE OF INFORMATION COLLECTED AUTOMATICALLY
We receive and store certain types of information automatically, such as whenever you interact with the Sites or use the Services. This information does not necessarily reveal your identity directly but may include information about the specific device you are using, such as the hardware model, operating system version, web-browser software (such as Firefox, Safari, or Internet Explorer) and your Internet Protocol (IP) address/MAC address/device identifier.

For example, we automatically receive and record information on our server logs from your browser, including how you came to and used the Services; your IP address; device type and unique device identification numbers, device event information (such as crashes, system activity and hardware settings, browser type, browser language, the date and time of your request and referral URL), broad geographic location (e.g. country or city-level location) and other technical data collected through cookies, pixel tags and other similar technologies that uniquely identify your browser. We may also collect information about how your device has interacted with our website, including pages accessed and links clicked. We may use identifiers to recognize you when you arrive at the Site via an external link, such as a link appearing on a third party site.

Please refer to the Thor Cookie Policy for more information about our use of cookies.

CHILDREN'S PERSONAL INFORMATION
We do not knowingly request of collect personal information from any person under the age of 18. If a user submitting personal information is suspected of being younger than 18 years of age, Thor will require the user to close his or her account and will not allow buying or selling digital currencies. We will also take steps to delete the information as soon as possible. Please notify us if you know of any individuals under the age of 18 using our Services so we can take action to prevent access to our Services.

California Privacy Rights

If you are a California resident, you have the right to request information from us regarding the manner in which we share certain categories of your personal information with third parties for the third parties' direct marketing purposes. California law provides that you have the right to submit a request to us at our designated address and receive the following information: (a) the categories of information we disclosed to third parties for the third parties' direct marketing purposes during the preceding calendar year; and (b) the names and addresses of third parties that received such information, or if the nature of their business cannot be determined from the name, then examples of the products or services marketed.

You are entitled to receive a copy of this information in a standardized format and the information will not be specific to you individually. You may make such a request by emailing support@thorpayments.com.

HOW TO CONTACT US
If you have questions or concerns regarding this Privacy Policy, or if you have a complaint, you should first contact us either by emailing us at support@thorpayments.com or by writing to us at Thor Technologies, Inc., 1161 Mission Street, San Francisco, CA 94104, USA, or by calling us at 1-617-515-5067.</div>
  }
  {
    this.state.showPrivacy &&   <div className="Welcome__termscheckbox">
          <Checkbox onChange={this.onPrivacyChecked} checked={this.state.privacyChecked} /> I accept Thor and Dwolla's Privacy Policy
        </div>
  }

          <div className="Welcome__btn">
            <Button type="primary" size="large" onClick={this.handleNextStep} disabled={!(this.state.privacyChecked && this.state.termsChecked)}>
              Create account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onTermsChecked = e => {

    if (e.target.checked) {
      this.setState({ showTerms: false, termsChecked: true, showPrivacy: true });
    } else {
      this.setState({ showTerms: true, termsChecked: false, showPrivacy: false });
    }
  }

  onPrivacyChecked = e => {
    if (e.target.checked) {
      this.setState({ showPrivacy: true, privacyChecked: true });
    } else {
      this.setState({ showPrivacy: true, privacyChecked: false });
    }
  }

  handleNextStep = () => {
    this.props.history.push(`register/contractor`);
  };
}


export default Welcome;
