// ===== CONFIG =====
// Replace with your real API key from https://api-ninjas.com
const API_KEY = '5hO1I7pbxEP3M2qfbJt7FQ==fefF6sJGVb6lKshn';

// DOM
const form = document.getElementById('apiForm');
const checkboxes = document.querySelectorAll('.toggle-checkbox');
const chkBucket = document.getElementById('chkBucket');
const chkStock = document.getElementById('chkStock');
const txtInput = document.getElementById('txtInput');
const response = document.getElementById('response');

// --- User-provided snippet (kept and used) ---
// Ensure only one checkbox is active at a time
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        // When one checkbox is checked, uncheck the others
        checkboxes.forEach((cb) => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
    });
});

// Enhance behavior: whenever a checkbox changes, clear input & response
checkboxes.forEach((cb) => cb.addEventListener('change', onRouteChange));

function onRouteChange() {
    // Clear input and response area
    txtInput.value = '';
    response.textContent = '';

    // UX: if Bucket selected, disable input and change placeholder; otherwise enable
    if (chkBucket.checked) {
        txtInput.placeholder = 'No input needed for Bucket List endpoint.';
        txtInput.disabled = true;
    } else if (chkStock.checked) {
        txtInput.placeholder = 'Enter ticker for Stock Price (e.g. AAPL)';
        txtInput.disabled = false;
        txtInput.focus();
    } else {
        txtInput.placeholder = 'Enter ticker for Stock Price (e.g. AAPL). Not used for Bucket List.';
        txtInput.disabled = false;
    }
}

// Initialize state
chkBucket.checked = false;
chkStock.checked = false;
txtInput.disabled = false;

// Form submit handler (connects the button to the selected API route)
form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    // Clear response area immediately when the button is clicked
    response.textContent = '';

    // Basic route selection check
    if (!chkBucket.checked && !chkStock.checked) {
        response.textContent = 'Please select one of the API routes (Bucket List or Stock Price).';
        return;
    }

    // If stock chosen — validate ticker presence
    if (chkStock.checked) {
        const ticker = txtInput.value.trim();
        if (!ticker) {
            response.textContent = 'Please enter a ticker symbol for the Stock Price endpoint (e.g. AAPL).';
            return;
        }
    }

    // Decide which route is selected and prepare URL
    let url = '';
    if (chkBucket.checked) {
        url = 'https://api.api-ninjas.com/v1/bucketlist';
    } else {
        const ticker = txtInput.value.trim();
            if (!ticker) {
                response.textContent = 'Please enter a ticker symbol for the Stock Price endpoint (e.g. AAPL).';
                return;
            }
        url = 'https://api.api-ninjas.com/v1/stockprice?ticker=' + encodeURIComponent(ticker);
    }

    // Show loading note
    response.textContent = 'Loading...';

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY,
                'Accept': 'application/json'
            }
        });

        const text = await res.text();
        let data = null;
        try { data = JSON.parse(text); } catch (e) { /* not JSON */ }

        // HTTP-level errors
        if (!res.ok) {
            let errorMessage = 'HTTP ' + res.status + ' ' + res.statusText;
            if (data) {
                if (data.message) errorMessage = data.message;
                else if (data.error) errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
                else errorMessage = JSON.stringify(data);
            } else if (text) {
                errorMessage = text;
            }
            response.textContent = 'Error: ' + errorMessage;
            return;
        }

        // (display of successful response added in next commit)
        if (data) {
            response.textContent = JSON.stringify(data, null, 2);
        } else {
            response.textContent = text || '(empty response)';
        }
    } catch (err) {
        response.textContent = 'Network error: ' + (err && err.message ? err.message : String(err));
    }
});