import { Package, Printer, Clipboard, Truck } from "lucide-react";
import Sidebar from "../../components/admin/sidebar/Sidebar";

function AdminLayout() {

  return (
    <>
      <div className="flex h-screen">
        < Sidebar />
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
          <div className="max-w-md w-full space-y-8">
            {/* Main illustration */}
            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="flex gap-8 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full mb-2" />
                  <div className="w-24 h-32 bg-orange-500 rounded-md" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full mb-2" />
                  <div className="w-24 h-24 bg-orange-500 rounded-md" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ainda não há pedidos para exibir
              </h2>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Package size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Clipboard size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Truck size={24} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Printer size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout