import { useState } from 'react'

export default function DynamicFormFieldGenerator() {
    const [inputs, setInputs] = useState([{ id: "1619431DVSB", value: "First input" }])

    const createRandomId = () => {
        const chars = '1234567890ABCDEFG'
        let id = ""
        for (let i = 0; i < 60; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
        return id
    }

    const addInput = (e) => {
        e.preventDefault()
        // push on the new input
        let newInput = { id: createRandomId(), value: "" }
        setInputs([...inputs, newInput])
    }

    const removeInput = (e, id) => {
        e.preventDefault()
        let updatedInputs = inputs.filter(input => input.id !== id)
        setInputs(updatedInputs)
    }

    const handleChange = (e, id) => {
        e.preventDefault()
        const textValue = e.target.value
        let updatedArray = inputs.map(i => i)
        // find id and update
        let foundInput = updatedArray.find(a => a.id === id)
        foundInput.value = textValue

        // AI's way to avoid mutating the state directly
        // const updatedArray = inputs.map(input =>
        //     input.id === id ? { ...input, value: textValue } : input
        // )

        // update array
        setInputs(updatedArray)
    }

    const logValues = (e) => {
        e.preventDefault()
        let failedValidation = false;
        let fieldsNeeded = []
        // validate
        inputs.forEach((input, i) => {
            if (input.value === "" || input.value === undefined) {
                failedValidation = true
                fieldsNeeded.push(i + 1)
            }
        })
        // return validation
        if (failedValidation) {
            alert(`Please make sure all fields are filled out, please see ${fieldsNeeded.length > 1 ? "inputs" : "input"}: ${fieldsNeeded.join(', ')}`)
            return
        }

        let a = {}
        inputs.forEach((input, i) => {
            a[`input-${i}`] = input.value
        })
        console.log(a)
    }


    return (
        <div className='p-2'>

            {/* need dynamically added inputs */}
            <div className="input_container p-2 bg-gray-100 rounded-lg">

                <div className="mb-2">
                    {inputs && inputs.map((input, i) => (
                        <div className="flex gap-4 mb-2 items-center w-full" key={input.id}>
                            <span className=''>{i + 1}</span>
                            <input type="text" className='p-2 rounded-md flex-grow bg-white text-gray-900' value={input.value} onChange={e => handleChange(e, input.id)} />
                            {i >= 1 ? <button className='p-2 px-4 rounded-md bg-red-400 text-white border-1 border-red-600 hover:bg-red-600' onClick={e => removeInput(e, input.id)}>X</button> : ""}
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button className='px-3 py-2 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700' onClick={e => addInput(e)}>Add Input</button>
                    <button className='px-3 py-2 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700' onClick={e => logValues(e)}>Log Values</button>
                </div>
            </div>
        </div>
    )
}
