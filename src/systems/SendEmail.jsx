import emailjs from '@emailjs/browser';

export const SendEmail = (templateParameters) => {

    emailjs
        .send(import.meta.env.VITE_SERVICE_API_KEY, import.meta.env.VITE_TEMPLATE_API_KEY, templateParameters, {
            publicKey: import.meta.env.VITE_PUBLIC_API_KEY,
        })
        .then(
            (response) => {
                console.log('SUCCESS:', response.status, response.text);
            },
            (error) => {
                console.log('FAILED:', error.text);
            },
        );

};