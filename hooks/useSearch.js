import { useToast } from "@chakra-ui/react"
import axios from "axios"
import { defaultHead } from "next/head"

import { useState } from "react"


// Bypass cors
const corsURL = 'https://secure-brook-81937.herokuapp.com'

const useSearch = () => {
    const toast = useToast()
    const [textAreaMessage, setTextArea] = useState('')
    const [typedInWords, setTypedInWords] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSubmitButton, setShowSubmitButton] = useState(true)
    const [searchData, setSearchData] = useState([])



    const submitForm = async (e) => {
        setIsloading(true)
        setSearchData([])
        try {
            e.preventDefault()
            console.log(typedInWords)
            if (typedInWords.length > 2) {
                const getWords = typedInWords.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; }).join('%2C')
                console.log(getWords, 'getWords')
                const { data } = await axios.get(`${corsURL
                    }/https://api.ritekit.com/v1/stats/multiple-hashtags?tags=${getWords}&client_id=b631092fe151e22e86c72636d4abbe3cc48f6c7dcbe2`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Origin": '*'
                    }
                })
                console.log(typedInWords)
                console.log('data', data, corsURL)
                setSearchData(data.stats)
            }
            setIsloading(false)

        }
        catch (e) {
            console.log('error', e)
            setIsloading(false)
        }

    }

    const handleChange = async (e) => {
        const inputWords = e.target.value
        setTypedInWords(inputWords)

    }

    const handleTextAreaChange = async (e) => {
        const inputWords = e.target.value
        setTextArea(inputWords.trim())
        inputWords.trim().length > 0
            ?
            setShowSubmitButton(false)
            :
            setShowSubmitButton(true)

    }
    const submitPost = (e) => {
        setIsSubmitting(true)
        setTimeout(() => {
            toast({
                title: 'Posted',
                description: "Your Product was successfully posted🤑",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            setIsSubmitting(false)
            setSearchData([])
            // e.target.value = ''

        }, 3000);
        return true
    }

    return {
        submitForm,
        typedInWords,
        searchData,
        handleChange,
        submitPost,
        handleTextAreaChange,
        showSubmitButton,
        isLoading,
        textAreaMessage,
        isSubmitting
    }

}
export default useSearch