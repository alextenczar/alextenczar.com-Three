"use client"

import { useParams } from 'next/navigation';


export default function Contact() {

    const { locale } = useParams();

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
        <main className="flex flex-col max-w-7xl w-full mx-auto px-9" >
            <h1 className="text-6xl font-bold mt-0">Contact</h1>
            <div className='max-w-xl sm:mt-48 mt-8 mb-2 w-full mx-auto'>
                <form onSubmit={handleSubmit} className="">
                    <h2 className="sm:text-center text-3xl font-bold mb-8 mt-8">{locale === 'ja' ? 'メッセージを送る' : 'Send a Message'}</h2>
                    <div className="mb-4 flex flex-col w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="form-name" className="sr-only">
                                Name
                            </label>
                            <input id="form-name" autoComplete="name" maxLength={50} size="lg" name="name" className="border-b-2 border-solid w-full" placeholder={locale === 'ja' ? '名前' : 'Name'} />
                        </div>

                        <div className="w-full">
                            <label htmlFor="form-email" className="sr-only">
                                Email
                            </label>
                            <input id="form-email" placeholder={locale === 'ja' ? 'メールアドレス' : 'Email'} required autoComplete="email" maxLength={80} name="email" type="email" className="border-b-2 border-solid w-full" />
                        </div>

                        <label htmlFor="form-message" className="sr-only">
                            Message
                        </label>
                        <textarea placeholder={locale === 'ja' ? 'お問い合わせ内容' : 'Your Message...'} id="form-message" required name="message" rows={5} className="border-b-2 border-solid" />


                        <button aria-label="Submit" className="hover:scale-105 transition-all duration-300 text-center mx-auto mt-4 justify-self-center px-8 py-4 bg-black text-white rounded-4xl text-xl" type="submit">{locale === 'ja' ? '送信' : 'Send'}</button>
                    </div>
                </form>
            </div>


        </main>
    )
}

