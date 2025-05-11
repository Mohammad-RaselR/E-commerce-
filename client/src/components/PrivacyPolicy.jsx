import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className='bg-[#f4f4f4]'>
            <div className="max-w-screen-xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-center mb-10">Privacy Policy</h1>
                <p>
                    When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet your needs, and to customize our website to make your experience safer and easier. More importantly, while doing so, we collect personal information from you that we consider necessary for achieving this purpose.
                </p>

                <div className='font-bold mt-10'>
                    Below are some of the ways in which we collect and store your information: 
                </div>

                <ul className="list-disc pl-5 space-y-4 mt-4">
                    <li>
                        We receive and store any information you enter on our website or give us in any other way. We use the information that you provide for such purposes as responding to your requests, customizing future shopping for you, improving our stores, and communicating with you.
                    </li>
                    <li>
                        We also store certain types of information whenever you interact with us. For example, like many websites, we use "cookies," and we obtain certain types of information when your web browser accesses UdaoMart.com or advertisements and other content served by or on behalf of UdaoMart.com on other websites.
                    </li>
                    <li>
                        When signing up via Facebook, we collect your Name and Email (provided by Facebook) as part of your UdaoMart account Information.
                    </li>
                    <li>
                        To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from UdaoMart if your computer supports such capabilities.
                    </li>
                </ul>

                <div className='font-bold mt-10'> 
                    The following information is collected from the app:
                </div>

                <ul className="list-disc pl-5 space-y-6 mt-4">
                    <li>
                        <div className="font-semibold mb-1">Your Email Address and your phone number:</div>
                        <div>
                            Necessary to authenticate you with our systems. We will not use this to contact you, unless necessary for service-related matters. This information will be be given out to third-parties, or be used to contact you for marketing purposes. This data will be stored on our systems for up to 3 years after your Driver contract is terminated, and since these uniquely identify you and since you're a contractor or an employee employed by the company (UdaoMart.com), this data cannot be deleted, for up to 3 years after the termination of your contract or your employment.
                        </div>
                    </li>
                    <li>
                        <div className="font-semibold mb-1">Your Real-time Location Data:</div>
                        <div>
                            This location data is sent by the app to our services when you're active on any delivery or pick up task. The location data is used to inform the operations managers on your delivery progress, and by our customers to get an update on their delivery estimate, while on active delivery. When you're not on an active shift, your location data will not be captured by the system. Your location data will be stored in our systems for up to 1 year, and since they involve monetary transactions, they cannot be requested for deletion. After the 1-year period, location data is automatically deleted.
                        </div>
                    </li>
                    <li>
                        <div className="font-semibold mb-1">Task Completion Data:</div>
                        <div>
                            Any data on your assigned delivery or pick-up tasks reported by you (such as Success/Failure, Cash Collected etc.) will be stored against that task, for the duration that task is saved on our systems. In these cases, your personal information is not stored. This data cannot be requested for deletion, as it is necessary for the functioning of the task itself.
                        </div>
                    </li>
                </ul>


                <div className="mt-16 space-y-8">
                    <p>
                        The personal information you provide us isn’t set in stone. You may review, update, correct or delete the contact information (Email Address or Phone Number) in your profile at any time.
                    </p>
                    <p>
                        Information about our drivers is an important part of our business, and we are not in the business of selling it to others.
                    </p>
                    <p>
                        We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of UdaoMart.com, our users, or others. This includes exchanging information with other companies and organizations for fraud protection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
