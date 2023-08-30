## Your Node.js version should over 14,if not Please update your Node.js by the following steps.
## 1. Front-end Environment Setup (Update Node.js)
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


### Start Front-end
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
