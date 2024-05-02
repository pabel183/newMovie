import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";

interface MovieCardProps {
    data: Record<string, any>,
}
const MovieCard: React.FC<MovieCardProps> = ({
    data
}) => {
    const route=useRouter();
    return (
        <div className="group bg-zinc-900 col-span-1 relative h-[12vw] ">
            <img
                className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            delay-300
            w-full
            h-[12vw]
            group-hover:opacity-90
            sm:group-hover:opacity-0
            " src={data?.thumbnailUrl} alt="thumbnail" />
            <div className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            w-full
            h-[12vw]
            invisible
            sm:visible
            delay-300
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover:translate-x-[2vw]
            group-hover:opacity-100
            ">
                <img
                    className="
                cursor-pointer
                object-cover
                w-full
                h-[12vw]
                rounded-t-md
                transition
                duration
                shadow-xl
                "
                    src={data.thumbnailUrl} alt="thumbnamil"
                />
                <div
                    className="
                z-10
                bg-zinc-800
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
                "
                >
                    <div className="flex flex-row items-center gap-3">
                        <div
                        onClick={()=>route.push(`/watch/${data?.id}`)}
                        className="
                        cursor-pointer
                        h-6
                        w-6
                        lg:h-10
                        lg:w-10
                        bg-white
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:bg-neutral-300
                        ">
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id}/>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="
                        flex
                        flex-row
                        items-center
                        mt-4
                        gap-2
                        ">
                        <p className="
                            text-white
                            text-[10px]
                            lg:text-sm
                            ">{data.duration}</p>
                    </div>
                    <div className="
                        flex
                        flex-row
                        items-center
                        mt-4
                        gap-2
                        ">
                        <p className="
                            text-white
                            text-[10px]
                            lg:text-sm
                            ">{data.genra}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;