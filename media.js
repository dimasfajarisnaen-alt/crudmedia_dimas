document.addEventListener("DOMContentLoaded", function () {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
    const form = document.querySelector("[data-media-form]");
    const fotoInput = document.getElementById("foto");
    const audioInput = document.getElementById("audio");
    const dokumenInput = document.getElementById("dokumen");
    const previewFoto = document.getElementById("previewFoto");
    const previewAudio = document.getElementById("previewAudio");
    const previewDokumen = document.getElementById("previewDokumen");
    const searchMedia = document.getElementById("searchMedia");
    const mediaRows = document.querySelectorAll("#mediaTable tbody tr");
    if (searchMedia && mediaRows.length > 0) {
        searchMedia.addEventListener("input", function () {
            const keyword = this.value.toLowerCase().trim();
            mediaRows.forEach(function (row) {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(keyword) ? "" : "none";
            });
        });
    }
    let fotoURL = null;
    let audioURL = null;
    if (fotoInput && previewFoto) {
        fotoInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) {
                previewFoto.hidden = true;
                return;
            }
            if (!file.type.startsWith("image/")) {
                alert("File foto harus berupa gambar.");
                this.value = "";
                previewFoto.hidden = true;
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert("Ukuran foto maksimal 2 MB.");
                this.value = "";
                previewFoto.hidden = true;
                return;
            }
            if (fotoURL) {
                URL.revokeObjectURL(fotoURL);
            }
            fotoURL = URL.createObjectURL(file);
            previewFoto.src = fotoURL;
            previewFoto.hidden = false;
        });
    }
    if (audioInput && previewAudio) {
        audioInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) {
                previewAudio.hidden = true;
                return;
            }
            if (!file.type.startsWith("audio/")) {
                alert("File audio harus berupa audio.");
                this.value = "";
                previewAudio.hidden = true;
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert("Ukuran audio maksimal 2 MB.");
                this.value = "";
                previewAudio.hidden = true;
                return;
            }
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
            }
            audioURL = URL.createObjectURL(file);
            previewAudio.src = audioURL;
            previewAudio.hidden = false;
        });
    }
    if (dokumenInput && previewDokumen) {
        dokumenInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) {
                previewDokumen.textContent = "Belum ada dokumen dipilih.";
                return;
            }
            if (file.type !== "application/pdf") {
                alert("Dokumen harus berupa PDF.");
                this.value = "";
                previewDokumen.textContent = "Belum ada dokumen dipilih.";
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert("Ukuran dokumen maksimal 2 MB.");
                this.value = "";
                previewDokumen.textContent = "Belum ada dokumen dipilih.";
                return;
            }
            previewDokumen.textContent =
                file.name + " - " + Math.round(file.size / 1024) + " KB";
        });
    }
    if (form) {
        form.addEventListener("submit", function (event) {
            const nim = document.getElementById("nim");
            const nama = document.getElementById("nama");
            const prodi = document.getElementById("program_studi");
            const email = document.getElementById("email");
            let valid = true;
            document.querySelectorAll(".form-error").forEach(function (el) {
                el.textContent = "";
            });
            document.querySelectorAll(".is-invalid").forEach(function (el) {
                el.classList.remove("is-invalid");
            });
            if (!nim || nim.value.trim() === "") {
                document.getElementById("errorNim").textContent = "NIM wajib diisi.";
                if (nim) nim.classList.add("is-invalid");
                valid = false;
            }
            if (!nama || nama.value.trim() === "") {
                document.getElementById("errorNama").textContent = "Nama wajib diisi.";
                if (nama) nama.classList.add("is-invalid");
                valid = false;
            }
            if (!prodi || prodi.value.trim() === "") {
                document.getElementById("errorProdi").textContent = "Program studi wajib diisi.";
                if (prodi) prodi.classList.add("is-invalid");
                valid = false;
            }
            if (!email || email.value.trim() === "" || !email.checkValidity()) {
                document.getElementById("errorEmail").textContent = "Email tidak valid."; if (email) email.classList.add("is-invalid");
                valid = false;
            }
            const wajibFoto = form.dataset.requireFoto === "true";
            if (wajibFoto && fotoInput && fotoInput.files.length === 0) {
                document.getElementById("errorFoto").textContent = "Foto wajib dipilih.";
                valid = false;
            }
            if (!valid) {
                event.preventDefault();
                alert("Form belum valid. Periksa kembali input Anda.");
            }
        });
    }
    document.querySelectorAll(".media-delete-form").forEach(function (formDelete) {
        formDelete.addEventListener("submit", function (event) {
            const yakin = confirm(
                "Data dan file media terkait akan dihapus. Lanjutkan?"
            );
            if (!yakin) {
                event.preventDefault();
            }
        });
    });
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "tambah") alert("Data media berhasil ditambahkan.");
    if (status === "update") alert("Data media berhasil diperbarui.");
    if (status === "hapus") alert("Data media berhasil dihapus.");
});
