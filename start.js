const { exec } = require('child_process');
const path = require('path');

function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        const process = exec(command, { cwd: cwd });

        process.stdout.on('data', data => {
            console.log(data.toString());
        });

        process.stderr.on('data', data => {
            console.error(data.toString());
        });

        process.on('exit', code => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Command "${command}" exited with code ${code}`);
            }
        });
    });
}

async function main() {
    try {
        const rootDir = __dirname;
        const schoolDashboardDir = path.join(rootDir, 'SchoolDashBoard');
        const schoolDashboardUIDir = path.join(rootDir, 'SchoolDashBoard.UI');

        const dotnetRunCommand = `cd ${schoolDashboardDir} && dotnet run`;
        const npmInstall = `cd ${schoolDashboardUIDir} &&  npm i`;
        const ngServeCommand = `cd ${schoolDashboardUIDir} && ng serve`;
        console.log('Running dotnet run and ng serve in parallel...');
        await runCommand(`npx concurrently "${dotnetRunCommand}" "${npmInstall}" "${ngServeCommand}"`);
        console.log('Both commands started successfully.');
    } catch (error) {
        console.error('Error running commands:', error);
    }
}

main();
