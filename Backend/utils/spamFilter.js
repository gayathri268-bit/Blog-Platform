const SPAM_KEYWORDS = [
    "buy now",
    "click here",
    "free money",
    "work from home",
    "limited offer",
    "earn cash",
    "casino",
    "loan approved",
    "viagra",
    "subscribe now",
    "make money fast",
];

const isSpamText = (text) => {
    const lowerText = text.toLowerCase();

    const hasSpamKeyword = SPAM_KEYWORDS.some((word) =>
        lowerText.includes(word)
    );

    const linkCount = (text.match(/https?:\/\/|www\./gi) || []).length;
    const hasTooManyLinks = linkCount >= 2;

    return hasSpamKeyword || hasTooManyLinks;
};

module.exports = isSpamText;