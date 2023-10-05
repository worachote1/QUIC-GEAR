import {LiaCartArrowDownSolid} from 'react-icons/lia'

export default function ProductMobilebar() {
    return (
      <div className="fixed bottom-0 h-20 border-2 shadow-2xl bg-white w-full">
        <div className="flex flex-row h-full items-center">
            <div className="w-1/4">
                <button className="hover:text-red-500 ml-8"><i className="fas fa-heart" style={{ fontSize: '1.9rem' }}></i></button>
            </div>
            <div className="flex flex-row w-3/4">
                <div className='flex'>
                    <div className="flex w-full">
                        <button className="flex w-32 h-11 rounded-xl bg-[#F1F1F1] hover:bg-[#DEDEDE] justify-center items-center">
                            ซื้อทันที
                        </button>
                    </div>
                </div>
                <div className='flex'>
                    <div className="flex w-full">
                        <button className="flex ml-3 w-36 h-11 rounded-xl bg-[#A51D2D] hover:bg-[#841724] justify-center items-center text-white">
                            <div className="flex flex-row items-center">
                                <LiaCartArrowDownSolid size={25} /> เพิ่มไปยังรถเข็น
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  