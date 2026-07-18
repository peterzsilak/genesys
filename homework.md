
# Playwright TypeScript Test Automation Homework

Ez a dokumentum a megadott tesztautomatizálási feladatsor (Homework) specifikációját és architektúráját tartalmazza Markdown formátumban.

---

## 📋 Preconditions & Technical Stack

- **Node.js:** `v18+`
- **Framework:** `Playwright v1.39.0`
- **Language:** TypeScript
- **Test Runner:** Configured via `package.json` scripts

---

## 🧪 Test Cases

### Case 1 – Automate Purchase Process

1. **Open URL:** `https://www.saucedemo.com/inventory.html`
2. **Setup Credentials:** Create `test/resources/credential.json`:
   ```json
   {
     "username": "performance_glitch_user",
     "password": "secret_sauce"
   }
   ```
3. **Parse Credentials:** Read and parse `credential.json` dynamically for the test execution.
4. **Login:** Enter the parsed username/password and click the **Login** button.
5. **Add Items to Cart:**
    - Sauce Labs Backpack
    - Sauce Labs Fleece Jacket
6. **Cart Validation:** Validate the item counter badge on the cart icon.
7. **Checkout:** Proceed through the entire checkout workflow.
8. **Confirmation:** Validate that the message `"Thank you for your order"` is displayed.

---

### Case 2 – Verify Error Messages for Mandatory Fields & Footer Content

1. **Open URL:** `https://www.saucedemo.com/inventory.html`
2. **Attempt Login:** Click the **Login** button with empty fields.
3. **Error Validation:** Validate the mandatory field error message.
4. **Valid Login:** Login using credentials: `standard_user` / `secret_sauce`.
5. **Scroll Page:** Scroll down to the bottom of the page.
6. **Footer Validation:** Verify that the footer text contains `2023` and `Terms of Service`.

---

### Case 3 – Rich Text Editor Automation

1. **Open URL:** `https://onlinehtmleditor.dev`
2. **Type Text:** Type `"Automation Test Example"` into the editor with the following formatting:
    - **"Automation"** typed in **bold** format.
    - **"Test"** typed in **underline** format.
    - **"Example"** typed in standard format.
3. **Validation:** Verify that the formatted text correctly appears inside the Rich Text Editor.

---

### Case 4 – iFrame & Multi-Tab Handling

1. **Open URL:** `http://demo.guru99.com/test/guru99home`
2. **iFrame Interaction:** Locate the image inside the iframe near the bottom of the page (just above Email Submission) and click it.
3. **New Tab Handling:** Verify a new page loads in a new tab with the title:
   > `Selenium Live Project: FREE Real Time Project for Practice`
4. **Tab Navigation:** Close the new tab and switch back to the main window.
5. **Hover Navigation:** Hover over the **Testing** menu item in the top navigation and click the **Selenium** link.
6. **Page Verification:** Verify that the wide red **Join Now** button is displayed near the bottom of the page.

---

### Case 5 – REST API Testing

1. **API Client Setup:** Integrate an API client / request library (e.g., Playwright `APIRequestContext` or `axios`).
2. **Send Request:**
    - **HTTP Method:** `GET`
    - **Base Host:** `https://jsonplaceholder.typicode.com`
    - **Endpoint:** `/users`
3. **Parse Response:** Convert the response payload into JSON format.
4. **Data Extraction & Logging:** Extract and log only the `name` and `email` properties for each user in the following format:
   ```text
   Leanne Graham | Sincere@april.biz
   Ervin Howell | Shanna@melissa.tv
   ```
5. **Email Validation:** Verify that the first user's email address contains the `@` symbol.

---

## 📦 Submission Guidelines

- Upload the complete project repository to **GitHub**.
- Ensure clean project structure, clear README setup, and atomic commits.