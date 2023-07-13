module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
            },
            settings: {
                defaultFrom: '190086131@aluno.unb.br',
                defaultReplyTo: 'no-reply@family-music-school.com',
            },
        },
    },
});