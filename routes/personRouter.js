const router = require('express').Router()
const Person = require('../models/Person')
//create
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ msg: 'This fiel cannot be empty!' })
        return
    }
    if (!salary) {
        res.status(422).json({ msg: 'This fiel cannot be empty!' })
        return
    }
    if (!approved) {
        res.status(422).json({ msg: 'This fiel cannot be empty!' })
        return
    }

    const person = {
        name, 
        salary, 
        approved,
    }
    //error treatment with http status and json message
    try {
        await Person.create(person)
        res.status(201).json({ msg: 'User created' })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

})
//retrieve one or more
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        console.log(person)
        if(!person) {
            res.status(422).json({ msg: 'User not found' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json( {msg: error} )
    }
})
//update
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, salary, approved } = req.body
    const person = {
        name, 
        salary, 
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        
        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({ msg: 'User not found' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ msg: error })
    }

})

//delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({_id: id})

    if(!person) {
        res.status(422).json({ msg: 'User not found' })
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({ msg: 'User deleted' })
    } catch (error) { 
        res.status(500).json({ msg: error })
    }
})

module.exports = router