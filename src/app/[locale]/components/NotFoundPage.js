import Image from 'next/image';

export default function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: 'auto' }} className='min-h-[66vh] flex flex-col '>
            <div className='my-auto'>
                <h1 className='text-6xl'>404</h1>
                <Image src="/sad_mac.png" alt="Sad Mac" width={100} height={100} className='mx-auto my-8' draggable="false" />
                <h2 className="">Sorry! The page you are looking for does not exist.</h2>
            </div>
        </div>
    );
}