/**
 * Created by Carlis on 2015/12/1.
 */
var schedule = require('node-schedule');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('5lym:jobs');

var jobs = module.exports = {};

var defaultCron = '* 0 1 * *';
var configFile = path.join(__dirname, 'config.json');

function register() {
    clearAllJobs();
    fs.readFile(configFile, 'utf8', function (error, data) {
        if (error) {
            return console.error(error);
        }
        var config = JSON.parse(data);
        Object.keys(config).forEach(function (job) {
            var jobConfig = config[job], jobExecutor = require('./' + job);
            if (jobConfig.active) {
                jobs[job] = schedule.scheduleJob(jobConfig.cron || jobExecutor.cron || defaultCron, jobExecutor);
            }
        });
    });
}

function clearAllJobs() {
    if (jobs) {
        Object.keys(jobs).forEach(function (jobId) {
            var job = jobs[jobId];
            job && job.cancel();
        });
    }
    jobs = {};
}

fs.watch(configFile, function (event, filename) {
    if (event === 'change') {
        debug('Jobs configuration file changes, reloading...');
        register();
        debug('Jobs loaded');
    }
});

register();