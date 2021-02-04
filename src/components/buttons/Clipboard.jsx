import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React, {useState} from "react";

const Clipboard = ({text, copy}) => {
    const [copied, setCopied] = useState(false);

    return (<>
        <CopyToClipboard text={copy}
                         onCopy={() => setCopied(true)}>
            <IconButton aria-label="copy to clipboard" component="span" size="small">
                {text} {copy}
                <FontAwesomeIcon icon={faCopy} size="sm" fixedWidth fixedHeight color={'#4e4e4e'}/>
            </IconButton>
        </CopyToClipboard>
    </>);
}
export default Clipboard;