import React, { useState, useEffect } from 'react'

export default function Screenshot(props) {
    const [screenshotBase64, setScreenshotBase64] = useState()
    const convertToBase64 = (arrayBuffer) => {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) { return p + String.fromCharCode(c) }, ''))
        // let mimetype = "image/jpeg"
        // return "data:" + mimetype + ";base64," + b64encoded
        return b64encoded
    }
    useEffect(() => {
        if (props && props.img) {
            console.log('image in screenshot comp', props.img.img.data.data)
            setScreenshotBase64(convertToBase64(props.img.img.data.data))
        }

    }, [props.img])

    return (
        <div>
            <div className="ui segment">
                <h3 className="ui header centered">Screenshot</h3>
                <img
                    className="ui centered large image"
                    src={`data:image/png;base64,${screenshotBase64}`} />

            </div>
        </div>
    )
}
