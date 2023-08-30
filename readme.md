## 1. Git clone files to your local environment

```bash
git clone https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo.git
```
## 2. Front-end Environment Setup (Update Node.js)
1. Go to front-end director:
   ```bash
   cd 9900Project/front_end
   ```

2. Download the nvm installation script using curl:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

3. Close and reopen your terminal window or run the following command to apply the changes
   ```bash
   source ~/.bashrc
   ```
   if no such file
   ```bash
   touch  ~/.bashrc
   ```
   then apply again
   ```bash
   source ~/.bashrc
   ```

4. Verify that nvm has been installed correctly by running the following command:
   ```bash
   nvm --version
   ```
   This command should return the current version of nvm installed on your system, which should be v0.39.3.

5. Install version 14.17.0:
   ```bash
   nvm install 14.17.0
   ```

6. Verify that Node.js has been installed correctly by running the following command:
   ```bash
   node -v
   ```
   This command should return the version of Node.js that you just installed (14.17.0). If not, please reinstall version 14.17.0.

## 3. Back-end Environment Setup
1. Go to back_end director:
   ```bash
   cd 9900Project/back_end
   ```

2. Install required package:
   ```bash
   pip install -r requirements.txt
   ```

### Start Back-end

1. Go to manage.py director:
   ```bash
   cd 9900Project/back_end/crm
   ```

2. Start project:
   ```bash
   python3 manage.py runserver
   ```

## 4. Start Front-end
1. Go to build director:
   ```bash
   cd 9900Project/front_end/build
   ```

2. Run:
   ```bash
   npm install -g serve
   ```

3. Run:
   ```bash
   serve -s
   ```
### Note: Please open the webpage using the Firefox browser.
