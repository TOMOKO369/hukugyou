const questions = [
    { text: "毎月の収入が変動しても、精神的に耐えられる。", category: "risk" },
    { text: "自分で目標を設定し、それに向かって計画的に行動できる。", category: "self_manage" },
    { text: "失敗した時の責任は、すべて自分が負うべきだと考える。", category: "responsibility" },
    { text: "新しいことを学ぶための自己投資（時間・お金）を惜しまない。", category: "growth" },
    { text: "組織のルールや方針に従うよりも、自分のやり方で進めたい。", category: "independence" },
    { text: "初対面の人と積極的にコミュニケーションをとるのが得意だ。", category: "interpersonal" },
    { text: "自分のスキルや価値を他人にアピール（営業）することに抵抗はない。", category: "sales" },
    { text: "仕事とプライベートの境界線が曖昧になっても気にならない。", category: "workstyle" },
    { text: "複数のプロジェクトやタスクを同時に進行・管理できる。", category: "self_manage" },
    { text: "確定申告や税金の計算など、事務作業も自分でこなせる（または学ぶ意欲がある）。", category: "admin" },
    { text: "指示待ちではなく、自ら仕事を取りに行く姿勢がある。", category: "independence" },
    { text: "休日でも仕事に関する緊急の連絡が来たら、すぐに対応できる。", category: "workstyle" },
    { text: "トラブルが起きた際、他責にせず自分で解決策を模索する。", category: "responsibility" },
    { text: "会社の肩書きではなく、自分個人の名前（実績）で勝負したい。", category: "independence" },
    { text: "孤独な作業が続いても、モチベーションを維持できる。", category: "self_manage" },
    { text: "自分の労働時間に対してではなく、成果に対して報酬をもらいたい。", category: "risk" },
    { text: "将来のビジョンや事業計画を立てるのが好きだ。", category: "growth" },
    { text: "オンとオフの切り替えを自分自身でコントロールできる。", category: "self_manage" },
    { text: "自分の専門スキルを常にアップデートし続ける自信がある。", category: "growth" },
    { text: "予定通りに物事が進まない時でも、臨機応変に対応できる。", category: "risk" },
    { text: "誰かに時間やタスクを管理されるよりも、自分で管理する方が得意だ。", category: "self_manage" },
    { text: "アイデアをゼロから形にするまでのプロセスを楽しむことができる。", category: "growth" },
    { text: "経済的な絶対の安心よりも、自由と裁量を持てる喜びの方が大きい。", category: "risk" },
    { text: "人脈を広げ、それを実際の仕事の獲得に繋げることができる。", category: "sales" },
    { text: "自分自身のサービスや商品の価格設定を、自信を持って行える。", category: "sales" },
    { text: "クライアントからの理不尽な要求に対しても、冷静に交渉・対応できる。", category: "interpersonal" },
    { text: "やるべきことが明確に与えられなくても、自分でタスクを見つけられる。", category: "independence" },
    { text: "健康管理も仕事の一部だと捉え、自己管理を徹底している。", category: "self_manage" },
    { text: "人生において「安定」よりも「挑戦」を重視する。", category: "risk" },
    { text: "将来的に自分の会社を持つなど、事業を拡大することに興味がある。", category: "growth" }
];

const scoringOptions = [
    { label: "当てはまる", score: 5 },
    { label: "やや当てはまる", score: 4 },
    { label: "どちらでもない", score: 3 },
    { label: "あまり当てはまらない", score: 2 },
    { label: "当てはまらない", score: 1 }
];

let currentQuestionIndex = 0;
let totalScore = 0;

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultType = document.getElementById('result-type');
const resultScore = document.getElementById('result-score');
const resultDesc = document.getElementById('result-desc');
const restartBtn = document.getElementById('restart-btn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', resetQuiz);

function startQuiz() {
    introScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    quizScreen.classList.add('fade-in');
    currentQuestionIndex = 0;
    totalScore = 0;
    showQuestion();
}

function showQuestion() {
    // Update progress
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressText.innerText = `質問 ${currentQuestionIndex + 1} / ${questions.length}`;

    // Update question text
    questionText.innerText = questions[currentQuestionIndex].text;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create option buttons
    scoringOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn slide-up';
        btn.innerText = option.label;
        btn.onclick = () => handleAnswer(option.score);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(score) {
    totalScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Animate out question and show next
        questionText.parentElement.classList.remove('fade-in');
        void questionText.parentElement.offsetWidth; // trigger reflow
        questionText.parentElement.classList.add('fade-in');
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultScreen.classList.add('fade-in');

    const maxScore = questions.length * 5;
    
    let type = "";
    let desc = "";

    // Diagnosis Logic based on total score
    // Min 30, Max 150
    if (totalScore < 70) {
        type = "完全な「副業」向き";
        desc = "あなたは安定や確実性を重視する傾向があります。いきなり独立するよりも、本業という安全網を持ちながら、空いた時間でできる副業から始めるのが最適です。リスクを最小限に抑えつつ、別の収入源を作ることで心にも余裕が生まれるでしょう。まずは趣味や特技を活かしたスモールステップでの挑戦をおすすめします。";
    } else if (totalScore < 100) {
        type = "まずは「副業・複業」から";
        desc = "独立への興味や自己管理能力は一定以上ありますが、いきなりの完全フリーランスは少しリスクを感じるタイプです。まずは本業を続けながら、土日や終業後に副業（または複数の仕事を持つ複業）として活動を始めてみましょう。実績と自信がつき、副業の収入が本業を超えたタイミングで独立を考えるのが最も安全で確実なルートです。";
    } else if (totalScore < 125) {
        type = "「フリーランス」予備軍";
        desc = "あなたはフリーランスとして活躍する素質を十分に持っています。自己管理ができ、ある程度のリスクを取ってでも自由や裁量を求める傾向があります。営業力や自己ブランディングのスキルをあと少し磨くことで、独立しても十分に食べていけるでしょう。準備期間を設け、半年〜1年以内の独立を視野に入れて動き出しても良いレベルです。";
    } else {
        type = "完全な「フリーランス・起業家」向き";
        desc = "あなたは生粋のフリーランス、あるいは起業家向きの性格です！リスクを恐れず、自分で道を切り開くことに強い喜びを感じるタイプ。組織の枠組みに収まるよりも、自分の裁量で自由にビジネスを展開する方が大きな成果を残せます。すでに独立している場合はその道を突き進み、まだの場合は今すぐ独立に向けた具体的な行動を起こすべきです。";
    }

    resultType.innerText = type;
    resultScore.innerText = `あなたのスコア: ${totalScore} / ${maxScore}点`;
    resultDesc.innerText = desc;
}

function resetQuiz() {
    resultScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    introScreen.classList.add('fade-in');
}
