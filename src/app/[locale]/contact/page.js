
"use client"

export default function Contact() {

    async function handleSubmit(event) {

        event.preventDefault();
        const formData = new FormData(event.target)
        try {

            const response = await fetch('/api/mail', {
                method: 'post',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();

            alert('Message successfully sent');
        } catch (err) {
            console.error(err);
            alert("Error, please try resubmitting the form");
        }
    };

    return (
        <main className="flex flex-col max-w-7xl mx-auto px-9" >
            <h1 className="text-6xl font-bold mt-0">Contact</h1>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full ">
                <h2 className="text-2xl">Send a Message</h2>
                <div className="mb-4 flex flex-col w-500">

                    <label htmlFor="form-name">Name </label>
                    <input id="form-name" autoComplete="name" maxLength={50} size="lg" name="name" className="text-black" />

                    <label htmlFor="form-email"> Email:</label>
                    <input id="form-email" required autoComplete="email" maxLength={80} name="email" type="email" className="text-black" />

                    <label htmlFor="form-message"> Message: </label>
                    <textarea id="form-message" required name="message" rows={5} className="text-black w-full" />

                </div>
                <button aria-label="Submit" className="" type="submit">Send</button>
            </form>
        </main>
    )
}

