import emailjs from '@emailjs/browser';

export const SendEmail = (
    publicKey: string, 
    serviceKey: string, 
    templateId: string, 
    templateParameters: Record<string, unknown>
) => {

    emailjs
        .send(serviceKey, templateId, templateParameters, {
            publicKey: publicKey,
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