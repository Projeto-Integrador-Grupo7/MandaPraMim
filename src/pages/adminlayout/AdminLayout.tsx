import Sidebar from "../../components/admin/sidebar/Sidebar";

function AdminLayout() {

  return (
    <>
      <div className="flex h-screen">
        < Sidebar />
        <div className="flex-1 p-6">
          <h1>Olá, Mundo!</h1>
        </div>
      </div>
    </>
  )
}

export default AdminLayout