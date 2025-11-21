// Variabel global untuk menyimpan pilihan kelas dan umur
let selectedKelas = '';
let selectedUmur = '';
let currentMenu = '';
let userProgress = {};
let currentQuestionIndex = 0;
let timerInterval = null;
let timeLeft = 0;

// Data konten untuk setiap menu berdasarkan kelas/umur
const contentData = {
    tatacara: {
        'sd-kelas-1-2': {
            title: 'Teknik Belajar untuk Anak SD Kelas 1-2',
            content: `
                <h3>Tips Belajar Menyenangkan untuk Anak Usia 6-8 Tahun</h3>
                <ol>
                    <li><strong>Belajar sambil bermain</strong> - Gunakan permainan edukatif untuk memahami konsep dasar</li>
                    <li><strong>Waktu belajar singkat</strong> - Maksimal 20-30 menit per sesi dengan istirahat</li>
                    <li><strong>Gunakan media visual</strong> - Gambar, warna, dan cerita membantu pemahaman</li>
                    <li><strong>Buat rutinitas</strong> - Tentukan waktu belajar yang sama setiap hari</li>
                    <li><strong>Berikan pujian</strong> - Apresiasi setiap usaha dan pencapaian kecil</li>
                </ol>
                <div class="question-container">
                    <p class="question-text">Manakah yang BUKAN teknik belajar yang baik untuk anak SD kelas 1-2?</p>
                    <div class="options-container">
                        <label class="option">
                            <input type="radio" name="q1" value="a"> Belajar sambil bermain
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="b"> Belajar selama 2 jam tanpa istirahat
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="c"> Menggunakan gambar dan warna
                        </label>
                        <label class="option">
                            <input type="radio" name="q1" value="d"> Membuat jadwal belajar rutin
                        </label>
                    </div>
                    <button class="submit-btn" onclick="checkAnswer('q1', 'b', 'result1')">Periksa Jawaban</button>
                    <div id="result1" class="result-container"></div>
                </div>
            `
        },
        'sd-kelas-3-4': {
            title: 'Teknik Belajar untuk Anak SD Kelas 3-4',
            content: `
                <h3>Strategi Belajar untuk Anak Usia 9-11 Tahun</h3>
                <ol>
                    <li><strong>Metode cerita</strong> - Ubah materi menjadi cerita menarik</li>
                    <li><strong>Belajar kelompok</strong> - Diskusi dengan teman untuk memahami konsep</li>
                    <li><strong>Mind mapping</strong> - Buat peta konsep untuk menghubungkan ide</li>
                    <li><strong>Praktik langsung</strong> - Aplikasikan pengetahuan dalam kehidupan sehari-hari</li>
                    <li><strong>Review berkala</strong> - Ulangi materi yang sudah dipelajari</li>
                </ol>
            `
        },
        'sma-kelas-10': {
            title: 'Teknik Belajar Efektif untuk Siswa SMA',
            content: `
                <h3>Strategi Belajar Efisien untuk SMA Kelas 10</h3>
                <ol>
                    <li><strong>Metode Pomodoro</strong> - Belajar 25 menit, istirahat 5 menit</li>
                    <li><strong>Active Recall</strong> - Uji pemahaman dengan mengingat tanpa melihat catatan</li>
                    <li><strong>Spaced Repetition</strong> - Ulangi materi dengan interval waktu tertentu</li>
                    <li><strong>Feynman Technique</strong> - Jelaskan konsep dengan bahasa sederhana</li>
                    <li><strong>Mind Mapping</strong> - Buat peta konsep untuk menghubungkan ide</li>
                </ol>
                <div class="question-container">
                    <p class="question-text">Teknik belajar mana yang mengharuskan Anda menjelaskan konsep dengan bahasa sederhana seolah-olah mengajarkannya kepada orang lain?</p>
                    <div class="options-container">
                        <label class="option">
                            <input type="radio" name="q2" value="a"> Metode Pomodoro
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="b"> Active Recall
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="c"> Feynman Technique
                        </label>
                        <label class="option">
                            <input type="radio" name="q2" value="d"> Spaced Repetition
                        </label>
                    </div>
                    <button class="submit-btn" onclick="checkAnswer('q2', 'c', 'result2')">Periksa Jawaban</button>
                    <div id="result2" class="result-container"></div>
                </div>
            `
        }
    },
    latihan: {
        'sd-kelas-1-2': {
            title: 'Latihan Matematika dan Bahasa Indonesia untuk SD Kelas 1-2',
            questions: [
                {
                    question: '5 + 3 = ...',
                    options: ['7', '8', '9', '10'],
                    correctAnswer: 1
                },
                {
                    question: 'Ibu membeli 4 apel dan 3 jeruk. Berapa total buah yang dibeli ibu?',
                    options: ['6', '7', '8', '9'],
                    correctAnswer: 1
                },
                {
                    question: 'Manakah kata yang tepat untuk melengkapi kalimat: "Adik ... main bola di halaman."',
                    options: ['sedang', 'akan', 'sudah', 'pernah'],
                    correctAnswer: 0
                }
            ]
        },
        'sma-kelas-10': {
            title: 'Latihan Matematika dan Fisika untuk SMA Kelas 10',
            questions: [
                {
                    question: 'Nilai dari 2x + 5 = 15. Berapakah nilai x?',
                    options: ['3', '5', '7', '10'],
                    correctAnswer: 1
                },
                {
                    question: 'Sebuah mobil bergerak dengan kecepatan 60 km/jam. Berapa jarak yang ditempuh dalam 2 jam?',
                    options: ['100 km', '120 km', '140 km', '160 km'],
                    correctAnswer: 1
                }
            ]
        }
    },
    'tes-iq': {
        'sd-kelas-1-2': {
            title: 'Tes IQ Sederhana untuk Anak SD',
            questions: [
                {
                    question: 'Apa yang menjadi lanjutan dari pola: 🔴, 🔵, 🔴, 🔵, ...?',
                    options: ['🔴', '🔵', '🟢', '🟡'],
                    correctAnswer: 0
                },
                {
                    question: 'Jika 1 kucing memiliki 4 kaki, berapa kaki 3 kucing?',
                    options: ['8', '12', '16', '20'],
                    correctAnswer: 1
                }
            ]
        }
    },
    bimbel: {
        'sd-kelas-1-2': {
            title: 'Bimbingan Belajar Matematika Dasar',
            content: `
                <h3>Belajar Penjumlahan dan Pengurangan</h3>
                <p>Mari belajar cara menjumlahkan dan mengurangi angka dengan mudah!</p>
                <div class="tutorial-section">
                    <h4>Penjumlahan</h4>
                    <p>Contoh: 3 + 2 = 5</p>
                    <p>Bayangkan Anda memiliki 3 apel, kemudian mendapat 2 apel lagi. Total apel Anda sekarang adalah 5 apel.</p>
                    
                    <h4>Pengurangan</h4>
                    <p>Contoh: 5 - 2 = 3</p>
                    <p>Bayangkan Anda memiliki 5 permen, kemudian memberikan 2 permen kepada teman. Sisa permen Anda adalah 3.</p>
                </div>
            `
        }
    },
    'teka-teki': {
        'sd-kelas-1-2': {
            title: 'Teka-Teki Matematika Menyenangkan',
            questions: [
                {
                    question: 'Aku sebuah angka. Jika ditambah 5 menjadi 10. Siapakah aku?',
                    options: ['3', '5', '7', '10'],
                    correctAnswer: 1
                }
            ]
        }
    },
    menghafal: {
        'sd-kelas-1-2': {
            title: 'Teknik Menghafal untuk Anak SD',
            content: `
                <h3>Cara Menghafal yang Menyenangkan</h3>
                <ol>
                    <li><strong>Metode lagu</strong> - Ubah materi menjadi lagu</li>
                    <li><strong>Kartu flash</strong> - Buat kartu dengan gambar dan kata</li>
                    <li><strong>Cerita berantai</strong> - Buat cerita yang menghubungkan informasi</li>
                    <li><strong>Asosiasi gambar</strong> - Hubungkan informasi dengan gambar lucu</li>
                </ol>
            `
        }
    }
};

// Inisialisasi progress pengguna
function initializeProgress() {
    const savedProgress = localStorage.getItem('ajakPintarProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    } else {
        userProgress = {
            completedLessons: [],
            scores: {},
            timeSpent: 0
        };
    }
}

// Simpan progress pengguna
function saveProgress() {
    localStorage.setItem('ajakPintarProgress', JSON.stringify(userProgress));
}

// Fungsi untuk menampilkan modal pemilihan kelas/umur
function showSelectionModal(menu) {
    currentMenu = menu;
    document.getElementById('selectionModal').style.display = 'flex';
}

// Fungsi untuk menyembunyikan modal
function hideSelectionModal() {
    document.getElementById('selectionModal').style.display = 'none';
}

// Fungsi untuk memproses pilihan kelas/umur
function processSelection() {
    selectedKelas = document.getElementById('kelas').value;
    selectedUmur = document.getElementById('umur').value;
    
    if (!selectedKelas || !selectedUmur) {
        alert('Silakan pilih kelas dan umur terlebih dahulu!');
        return false;
    }
    
    hideSelectionModal();
    showContent(currentMenu);
    return false;
}

// Fungsi untuk menampilkan konten berdasarkan menu yang dipilih
function showContent(menu) {
    // Sembunyikan semua konten terlebih dahulu
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Sembunyikan menu utama
    document.querySelector('.menu-container').style.display = 'none';
    
    // Tampilkan konten yang sesuai
    const contentSection = document.getElementById(`content${menu.charAt(0).toUpperCase() + menu.slice(1)}`);
    if (contentSection) {
        contentSection.style.display = 'block';
        
        // Perbarui subtitle dengan informasi kelas/umur
        const subtitleElement = contentSection.querySelector('.content-subtitle');
        if (subtitleElement) {
            subtitleElement.textContent = `Untuk ${getKelasLabel(selectedKelas)} (${selectedUmur} tahun)`;
        }
        
        // Isi konten berdasarkan pilihan kelas/umur
        const contentElement = contentSection.querySelector(`#${menu}Content`);
        if (contentData[menu] && contentData[menu][selectedKelas]) {
            const menuData = contentData[menu][selectedKelas];
            
            if (menuData.questions) {
                // Jika ada kumpulan soal, tampilkan sebagai kuis
                displayQuiz(menu, menuData.questions, contentElement);
            } else {
                // Jika hanya konten biasa
                contentElement.innerHTML = menuData.content || `<p>Konten untuk ${getKelasLabel(selectedKelas)} sedang dalam pengembangan.</p>`;
            }
        } else {
            contentElement.innerHTML = `<p>Konten untuk ${getKelasLabel(selectedKelas)} sedang dalam pengembangan. Silakan pilih kategori lain.</p>`;
        }
        
        // Catat progress
        if (!userProgress.completedLessons.includes(menu)) {
            userProgress.completedLessons.push(menu);
            saveProgress();
        }
    }
}

// Fungsi untuk menampilkan kuis
function displayQuiz(menu, questions, container) {
    currentQuestionIndex = 0;
    const menuData = contentData[menu][selectedKelas];
    
    container.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" id="quizProgress" style="width: 0%"></div>
            </div>
            <div class="progress-text" id="progressText">Soal 1 dari ${questions.length}</div>
        </div>
        <div class="timer-container" id="quizTimer">
            <span class="timer-icon">⏱️</span>
            <span id="timerDisplay">00:00</span>
        </div>
        <div id="quizQuestions"></div>
        <button class="submit-btn" id="nextQuestionBtn" style="display:none;" onclick="nextQuestion()">Soal Berikutnya</button>
        <div id="quizResults" style="display:none;"></div>
    `;
    
    startTimer();
    showQuestion(questions, container);
}

// Fungsi untuk memulai timer
function startTimer() {
    timeLeft = 0;
    timerInterval = setInterval(() => {
        timeLeft++;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timerDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Fungsi untuk menghentikan timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Fungsi untuk menampilkan soal
function showQuestion(questions, container) {
    const question = questions[currentQuestionIndex];
    const quizContainer = container.querySelector('#quizQuestions');
    
    quizContainer.innerHTML = `
        <div class="question-container">
            <p class="question-text">${currentQuestionIndex + 1}. ${question.question}</p>
            <div class="options-container" id="optionsContainer">
                ${question.options.map((option, index) => `
                    <label class="option">
                        <input type="radio" name="quizQuestion" value="${index}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <button class="submit-btn" onclick="submitAnswer(${currentQuestionIndex})">Jawab</button>
            <div id="questionResult" class="result-container"></div>
        </div>
    `;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
}

// Fungsi untuk submit jawaban
function submitAnswer(questionIndex) {
    const selectedOption = document.querySelector('input[name="quizQuestion"]:checked');
    const resultElement = document.getElementById('questionResult');
    const questions = contentData[currentMenu][selectedKelas].questions;
    const question = questions[questionIndex];
    
    if (!selectedOption) {
        resultElement.textContent = 'Silakan pilih jawaban terlebih dahulu!';
        resultElement.className = 'result-container incorrect';
        resultElement.style.display = 'block';
        return;
    }
    
    const isCorrect = parseInt(selectedOption.value) === question.correctAnswer;
    
    if (isCorrect) {
        resultElement.textContent = 'Jawaban Anda benar! 👍';
        resultElement.className = 'result-container correct';
        
        // Update score
        if (!userProgress.scores[currentMenu]) {
            userProgress.scores[currentMenu] = 0;
        }
        userProgress.scores[currentMenu]++;
        saveProgress();
    } else {
        resultElement.textContent = `Jawaban Anda salah. Jawaban yang benar adalah: ${question.options[question.correctAnswer]}`;
        resultElement.className = 'result-container incorrect';
    }
    
    resultElement.style.display = 'block';
    document.getElementById('nextQuestionBtn').style.display = 'block';
}

// Fungsi untuk pindah ke soal berikutnya
function nextQuestion() {
    const questions = contentData[currentMenu][selectedKelas].questions;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions, document.getElementById(`${currentMenu}Content`));
        document.getElementById('nextQuestionBtn').style.display = 'none';
    } else {
        // Kuis selesai
        finishQuiz();
    }
}

// Fungsi ketika kuis selesai
function finishQuiz() {
    stopTimer();
    const questions = contentData[currentMenu][selectedKelas].questions;
    const score = userProgress.scores[currentMenu] || 0;
    const percentage = Math.round((score / questions.length) * 100);
    
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    const resultsContainer = document.getElementById('quizResults');
    resultsContainer.innerHTML = `
        <div class="question-container" style="text-align: center;">
            <h3>Kuis Selesai! 🎉</h3>
            <p>Waktu yang dibutuhkan: ${document.getElementById('timerDisplay').textContent}</p>
            <p>Skor Anda: ${score} dari ${questions.length} (${percentage}%)</p>
            <div class="progress-bar" style="margin: 20px 0;">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <p>${percentage >= 70 ? 'Selamat! Anda menguasai materi ini dengan baik.' : 'Jangan menyerah! Terus berlatih untuk meningkatkan pemahaman.'}</p>
            <button class="submit-btn" onclick="showContent('${currentMenu}')">Ulangi Kuis</button>
            <button class="btn btn-secondary" onclick="showMenu()">Kembali ke Menu</button>
        </div>
    `;
    resultsContainer.style.display = 'block';
    
    // Update progress bar ke 100%
    document.getElementById('quizProgress').style.width = '100%';
    document.getElementById('progressText').textContent = 'Kuis Selesai!';
    
    // Simpan waktu yang dihabiskan
    userProgress.timeSpent += timeLeft;
    saveProgress();
}

// Fungsi untuk kembali ke menu utama
function showMenu() {
    stopTimer();
    
    // Sembunyikan semua konten
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Tampilkan menu utama
    document.querySelector('.menu-container').style.display = 'block';
}

// Fungsi untuk mendapatkan label kelas
function getKelasLabel(kelas) {
    const kelasLabels = {
        'sd-kelas-1-2': 'SD Kelas 1-2',
        'sd-kelas-3-4': 'SD Kelas 3-4',
        'sd-kelas-5-6': 'SD Kelas 5-6',
        'smp-kelas-7': 'SMP Kelas 7',
        'smp-kelas-8': 'SMP Kelas 8',
        'smp-kelas-9': 'SMP Kelas 9',
        'sma-kelas-10': 'SMA Kelas 10',
        'sma-kelas-11': 'SMA Kelas 11',
        'sma-kelas-12': 'SMA Kelas 12'
    };
    
    return kelasLabels[kelas] || kelas;
}

// Fungsi untuk memeriksa jawaban (untuk soal individual)
function checkAnswer(questionName, correctValue, resultId) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const resultElement = document.getElementById(resultId);
    
    if (!selectedOption) {
        resultElement.textContent = 'Silakan pilih jawaban terlebih dahulu!';
        resultElement.className = 'result-container incorrect';
        resultElement.style.display = 'block';
        return;
    }
    
    if (selectedOption.value === correctValue) {
        resultElement.textContent = 'Jawaban Anda benar! 👍';
        resultElement.className = 'result-container correct';
    } else {
        resultElement.textContent = 'Jawaban Anda salah. Coba lagi!';
        resultElement.className = 'result-container incorrect';
    }
    
    resultElement.style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeProgress();
    
    // Event listener untuk menu card
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', function() {
            const menu = this.getAttribute('data-menu');
            showSelectionModal(menu);
        });
    });
    
    // Event listener untuk form pemilihan
    document.getElementById('selectionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processSelection();
    });
    
    // Event listener untuk tombol batal
    document.getElementById('cancelBtn').addEventListener('click', hideSelectionModal);
    
    // Event listener untuk klik di luar modal
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('selectionModal');
        if (e.target === modal) {
            hideSelectionModal();
        }
    });
});