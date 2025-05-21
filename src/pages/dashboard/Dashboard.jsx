import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/AdminForm";
import { getAdmin, deleteAdmin } from "../../api/adminAPI";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";

import SearchBar from "../../components/SearchBar";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash , FaEye } from "react-icons/fa";

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  // Fetch admins with pagination and search
  const getAdmins = async () => {
    setLoading(true);
    try {
      const res = await getAdmin(currentPage, searchTerm);
      setAdmins(res.data.admins || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch admins", err);
    } finally {
      setLoading(false);
    }
  };

  //  On logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  //  Handle delete admin
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  //  Confirm delete admin
  const handleConfirmDelete = async () => {
    try {
      await deleteAdmin(deleteId);
      toast.success("Admin deleted successfully!");
      getAdmins();
    } catch (err) {
      toast.error("Failed to delete admin.");
    } finally {
      setDeleteId(null);
      setShowDeleteDialog(false);
    }
  };

  //  Handle edit admin
  const handleEdit = (admin) => {
    setEditAdmin(admin);
    setShowForm(true);
  };


  // Alert message display
  const messageAlert =(name)=>{
    alert(`User Name : ${name}`)
  }


  //  Close form modal
  const handleFormClose = () => {
    setShowForm(false);
    setEditAdmin(null);
  };

  //  Fetch data on page change or search term
  useEffect(() => {
    getAdmins();
  }, [currentPage, searchTerm]);

  //  Reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-4 sm:p-6 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl text-yellow-500 font-bold">ADMINS</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto cursor-pointer bg-red-500 text-white font-semibold px-4 py-2 hover:bg-red-400 transition"
          >
            LOGOUT
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto cursor-pointer bg-yellow-500 font-semibold text-white px-4 py-2 transition hover:bg-yellow-400"
          >
            ADD NEW ADMIN
          </button>
        </div>
      </div>

      {/* Search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* AdminForm Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-white z-50">
          <AdminForm
            onClose={handleFormClose}
            editData={editAdmin}
            onAdd={getAdmins}
          />
        </div>
      )}

      {/* Admin Table */}
      {loading ? (
        <div className="mt-25 flex justify-center items-center px-4 text-yellow-600">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
            Loading admins...
          </h2>
        </div>
      ) : admins.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center text-center p-6 bg-yellow-50 rounded shadow-md">
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">
            No Admins Found
          </h3>
          <p className="text-gray-600">
            Click the "ADD NEW ADMIN" button to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded shadow">
            <table className="overflow-x-auto w-full border border-gray-200 text-left text-sm sm:text-base">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone Number</th>
                  <th className="p-3 text-pretty md:text-balance">Address</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="border-t odd:bg-white even:bg-gray-100"
                  >
                    <td className="p-3">{admin.name}</td>
                    <td className="p-3">{admin.email}</td>
                    <td className="p-3">{admin.phone}</td>
                    <td className="p-3">{admin.address}</td>
                    <td className="p-3 flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(admin._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button className="cursor-pointer"
                      onClick={()=> messageAlert(admin.name)}>
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center gap-1 text-sm">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 font-semibold py-2 rounded  flex items-center gap-1 hover:bg-gray-100 transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white cursor-pointer"
                  }`}
                >
                  <FaChevronLeft className="text-xs" />
                  Previous
                </button>

                {/* Dynamic Page Numbers with Ellipsis */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`font-semibold px-3 py-1 rounded transition ${
                          currentPage === page
                            ? "bg-yellow-500 text-white "
                            : "bg-white cursor-pointer hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={`ellipsis-${page}`}
                        className="px-3 py-1 text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`font-semibold px-3 py-2 rounded flex items-center gap-1 hover:bg-gray-100 transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white cursor-pointer"
                  }`}
                >
                  Next
                  <FaChevronRight className="text-xs" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-opacity-30 z-40 flex justify-center items-center bg-white/30  backdrop-opacity-95 p-4 sm:p-6 mx-auto">
          <DeleteConfirmDialog
            onClose={() => {
              setShowDeleteDialog(false);
            }}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
