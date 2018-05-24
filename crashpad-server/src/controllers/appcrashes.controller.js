class AppCrashesController {
    receiveCrash(req, res, next) {
        console.info('Got Crash Data:');
        console.dir(req.body);
        console.info('End Crash Data');
        res.end();
    }
}

module.exports = new AppCrashesController();
