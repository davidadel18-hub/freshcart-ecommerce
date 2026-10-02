import { Truck , Shield , ArrowBigLeft , HeadphonesIcon} from 'lucide-react'; // يمكنك استخدام أي مكتبة أيقونات تفضلها

export default function FourSmallCards({ comp, mainText }: { comp: string; mainText: string }) {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100  transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer">
      {/* حاوية الأيقونة الدائرية */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
        {comp === "Free Shipping" && <Truck className="w-6 h-6" strokeWidth={2.5} />}
        {comp === "Secure Payment" && <Shield className="w-6 h-6 text-green-500" strokeWidth={2.5} />}
        {comp === "24/7 Support" && <HeadphonesIcon className="w-6 h-6 text-yellow-500" strokeWidth={2.5} />}
        {comp === "Money Back" && <ArrowBigLeft className="w-6 h-6 text-red-500" strokeWidth={2.5} />}
      </div>

      {/* نصوص البطاقة */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-gray-900 font-bold text-base tracking-wide">
          {comp}
        </h3>
        <p className="text-gray-500 text-sm font-medium">
          {mainText}
        </p>
      </div>
    </div>
  );
}
