import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateStudentsMutation } from "../../hooks/useCreateStudentsMutation";
import { useGetParentsQuery } from "../../hooks/useGetParentQuery";
import Swal from "sweetalert2";

const AddStudentModal = ({ isOpen, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    className: "",
    parentId: "",
  });

  const { data: parentsData, isLoading: isLoadingParents } =
    useGetParentsQuery();
  const { mutate: createStudents, isPending: isLoading } =
    useCreateStudentsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = [
      {
        name: formData.name.trim(),
        className: formData.className.trim(),
        parentId: formData.parentId ? parseInt(formData.parentId) : null,
        // isActive akan ditambahkan di mutation
      },
    ];

    createStudents(studentData, {
      onSuccess: (response) => {
        if (response.status === true) {
          Swal.fire({
            title: "Berhasil!",
            text: response.message || "Data siswa berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
          onClose();
          refetch();
          setFormData({
            name: "",
            className: "",
            parentId: "",
          });
        } else {
          // Handle kasus dimana API mengembalikan status false
          Swal.fire({
            title: "Gagal!",
            text: response.message || "Gagal menambahkan data siswa",
            icon: "error",
            confirmButtonColor: "#EF4444",
          });
        }
      },
      onError: (error) => {
        console.error("Error detail:", error?.response?.data);
        Swal.fire({
          title: "Gagal!",
          text:
            error?.response?.data?.message ||
            "Terjadi kesalahan saat menambahkan data",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Tambah Siswa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kelas
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: X IPA 1"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orang Tua
            </label>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading || isLoadingParents}
            >
              <option value="">Pilih Orang Tua (Opsional)</option>
              {parentsData?.data?.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
