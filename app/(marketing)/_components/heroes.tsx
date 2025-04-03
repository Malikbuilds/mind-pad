import Image from "next/image";
import image from "next/image";

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex flex-col items-center justify-center max-w-5xl px-4 pt-8 sm:pt-12">
                <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] mt-4">
                    <Image
                    src="/hero.png"
                    fill
                    className="object-contain dark:hidden"
                    alt="Hero Image"
                    />
                    <Image
                    src="/hero.png"
                    fill
                    className="object-contain hidden dark:block"
                    alt="Hero Image"
                    />
                </div>
            </div>
        </div>
    )
}

export default Heroes;