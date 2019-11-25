const express = require('express');
const authCheck = require('./../middleware/authCheck');
const RecordModel = require('./../models/recordModel');
const LikesModel = require('./../models/likesModel');
const UserModel = require('./../models/userModel');
const NotificationModel = require('./../models/notificationModel');

const router = express.Router();

router.get('/all', authCheck, (req, res, next) => {

    const records = async () => {
        const recordObject = await RecordModel.findAndCountAll();
        const recordsArr = recordObject.rows;
        let finalResult = []
        for (let record of recordsArr) {
            const likes = await LikesModel.findAndCountAll({
                where: {
                    recordId: record.id
                }
            })
            const user = await UserModel.findOne({
                where: {
                    id: record.userId
                }
            })
            const like = await LikesModel.findOne({
                where: {
                    userId: req.userData.userId,
                    recordId: record.id
                }
            })
            const fetchedLike = JSON.parse(JSON.stringify(like));
            let likeStatus;
            if (fetchedLike) {
                likeStatus = true;
            } else {
                likeStatus = false;
            }
            const fetchedUser = JSON.parse(JSON.stringify(user));
            const fullName = fetchedUser.name + ' ' + fetchedUser.surname;
            finalResult.push({
                id: record.id,
                title: record.title,
                description: record.description,
                type: record.type,
                submittedBy: fullName,
                totalLikes: likes.count,
                likeStatus: likeStatus,
                createdAt: record.createdAt
            })
        }
        res.json(finalResult)
    }
    records();
})
router.get('', authCheck, (req, res, next) => {

    const records = async () => {
        const recordObject = await RecordModel.findAndCountAll({
            where: {
                userId: req.userData.userId
            }
        })
        const recordsArr = recordObject.rows;
        let finalResult = []
        for (let record of recordsArr) {
            const likes = await LikesModel.findAndCountAll({
                where: {
                    recordId: record.id
                }
            })
            finalResult.push({
                id: record.id,
                title: record.title,
                description: record.description,
                type: record.type,
                totalLikes: likes.count,
                createdAt: record.createdAt
            })
        }
        res.json(finalResult)
    }
    records();
})

router.get('/record', authCheck, (req, res, next) => {
    const getRecord = async () => {
        const recordObject = await RecordModel.findOne({
            where: {
                id: req.query.id
            }
        })
        const record = JSON.parse(JSON.stringify(recordObject));
        let finalResult = []
        const likes = await LikesModel.findAndCountAll({
            where: {
                recordId: record.id
            }
        })
        const user = await UserModel.findOne({
            where: {
                id: record.userId
            }
        })
        const like = await LikesModel.findOne({
            where: {
                userId: req.userData.userId,
                recordId: record.id
            }
        })
        const fetchedLike = JSON.parse(JSON.stringify(like));
        let likeStatus;
        if (fetchedLike) {
            likeStatus = true;
        } else {
            likeStatus = false;
        }
        const fetchedUser = JSON.parse(JSON.stringify(user));
        const fullName = fetchedUser.name + ' ' + fetchedUser.surname;
        //need to push department
        finalResult.push({
            id: record.id,
            title: record.title,
            description: record.description,
            department: record.depId,
            benefits: record.benefits,
            type: record.type,
            submittedBy: fullName,
            totalLikes: likes.count,
            likeStatus: likeStatus,
            createdAt: record.createdAt
        })
        res.send(finalResult);
    }
    getRecord();

})

router.post('/likeRecord', authCheck, (req, res, next) => {
    LikesModel.findOrCreate({
        where: {
            recordId: req.body.id,
            userId: req.userData.userId
        }
    }).then(result => {
        const fetchedResult = JSON.parse(JSON.stringify(result))
        if (fetchedResult[1]) {

            const getRecord = async () => {
                const recordObject = await RecordModel.findOne({
                    where: {
                        id: req.body.id
                    }
                })
                const record = JSON.parse(JSON.stringify(recordObject));
                let finalResult = []
                const likes = await LikesModel.findAndCountAll({
                    where: {
                        recordId: record.id
                    }
                })
                const user = await UserModel.findOne({
                    where: {
                        id: record.userId
                    }
                })
                const like = await LikesModel.findOne({
                    where: {
                        userId: req.userData.userId,
                        recordId: record.id
                    }
                })
                const fetchedLike = JSON.parse(JSON.stringify(like));
                let likeStatus;
                if (fetchedLike) {
                    likeStatus = true;
                } else {
                    likeStatus = false;
                }
                const fetchedUser = JSON.parse(JSON.stringify(user));
                const fullName = fetchedUser.name + ' ' + fetchedUser.surname;
                //need to push department
                finalResult.push({
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    benefits: record.benefits,
                    type: record.type,
                    submittedBy: fullName,
                    totalLikes: likes.count,
                    likeStatus: likeStatus,
                    createdAt: record.createdAt
                })
                //notification creation
                notification = {
                    toUserId: fetchedUser.id,
                    fromUserId: req.userData.userId,
                    depId: req.userData.depId,
                    title: 'Record Liked',
                    message: 'User has liked your record',
                    importance: 1,
                    seen: 0,
                    path: '/record/' + req.body.id
                }
                console.log(notification);
                NotificationModel.findOrCreate({
                    where: {toUserId: fetchedUser.id, path: '/record/'+req.body.id},
                    defaults: notification
                }).then(result => {
                    console.log(result);
                })

                res.send(finalResult);
            }
            getRecord();
            //res.json(fetchedResult)
        } else {
            LikesModel.destroy({
                where: {
                    userId: req.userData.userId,
                    recordId: fetchedResult[0].recordId
                }
            }).then(result => {
                const getRecord = async () => {
                    const recordObject = await RecordModel.findOne({
                        where: {
                            id: req.body.id
                        }
                    })
                    const record = JSON.parse(JSON.stringify(recordObject));
                    let finalResult = []
                    const likes = await LikesModel.findAndCountAll({
                        where: {
                            recordId: record.id
                        }
                    })
                    const user = await UserModel.findOne({
                        where: {
                            id: record.userId
                        }
                    })
                    const like = await LikesModel.findOne({
                        where: {
                            userId: req.userData.userId,
                            recordId: record.id
                        }
                    })
                    const fetchedLike = JSON.parse(JSON.stringify(like));
                    let likeStatus;
                    if (fetchedLike) {
                        likeStatus = true;
                    } else {
                        likeStatus = false;
                    }
                    const fetchedUser = JSON.parse(JSON.stringify(user));
                    const fullName = fetchedUser.name + ' ' + fetchedUser.surname;
                    //need to push department
                    finalResult.push({
                        id: record.id,
                        title: record.title,
                        description: record.description,
                        benefits: record.benefits,
                        type: record.type,
                        submittedBy: fullName,
                        totalLikes: likes.count,
                        likeStatus: likeStatus,
                        createdAt: record.createdAt
                    })
                    res.send(finalResult);
                }
                getRecord();
            })
        }
    })

})

router.post('/updateRecord', authCheck, (req, res, next) => {
    RecordModel.update({
        title: req.body.title,
        description: req.body.description,
        benefits: req.body.benefits,
        type: req.body.type
    }, {
        where: { id: req.body.id, userId: req.userData.userId }
    }).then(result => {
        res.json(result)
    })
})

router.post('/create-record', authCheck, (req, res, next) => {
    console.log("ID: " + req.userData.userId);
    time = new Date().getTime();
    console.log(time);
    newRecord = {
        id: '',
        userId: req.userData.userId,
        depId: req.body.department,
        title: req.body.title,
        description: req.body.description,
        benefits: req.body.benefits,
        phase: 'Record Raised',
        permission: 'public',
        type: req.body.type,
        status: "active",
        submitted: time,
        modified: time
    };
    RecordModel.findOrCreate({
        where: {
            title: req.body.title
        },
        defaults: newRecord
    }).then(([record, status]) => {

        if (!status) {
            return res.status(400).json({
                message: 'Error adding Record. Try again'
            })
        }
        fetchedRecord = JSON.parse(JSON.stringify(record))

        const finalResult = Object.assign(...Object.keys(fetchedRecord).map(el => ({
            id: fetchedRecord.id,
            title: fetchedRecord.title,
            description: fetchedRecord.description,
            type: fetchedRecord.type,
            totalLikes: 0,
            createdAt: fetchedRecord.createdAt
        })))

        res.json(finalResult);

    });
})


module.exports = router;