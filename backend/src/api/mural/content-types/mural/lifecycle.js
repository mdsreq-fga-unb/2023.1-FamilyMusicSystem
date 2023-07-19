module.exports = {
    async afterCreate(event) {
        const { result } = event;
        const students = await strapi.query('students').find({});

        for (const student of students) {
            const { Email, Name } = student;
            const subject = `${result.title}`;
            const message = `Olá ${Name},\n\nHá um novo aviso disponível na plataforma da escola.\n\n <b>${result.message}</b>
        \n\nAtenciosamente,\nFamily Music School`;

            await strapi.plugins['email'].services.email.send({
                to: student.Email,
                from: 'no-reply@strapi.io',
                subject: subject,
                text: message,
            });
        }
    },
};
