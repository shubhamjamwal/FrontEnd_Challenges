import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { abyss } from '@uiw/codemirror-theme-abyss';
import { javascript } from '@codemirror/lang-javascript';
import { staticCode } from './TextData';
export default function TextGenerate() {
    const [text, setText] = useState('click for start generating text');

    const [selected, setSelected] = useState(false);
    let idInterval;
    useEffect(() => {
        console.log('selected', selected);
        if (selected) {
            let i = 0;
            let generCode = '';
            idInterval = setInterval(() => {
                let ttt = '';
                generCode = generCode + staticCode[i];
                setText(generCode);
                ++i;
                console.log('i', i);
                if (i === staticCode.length - 1) {
                    clearInterval(idInterval);
                }
            }, 10);
        }

        return () => {
            clearInterval(idInterval);
        };
    }, [selected]);

    // Write your code here
    return (
        <div>
            <>
                <button
                    onClick={() => {
                        setSelected(true);
                    }}
                >
                    Start Generating
                </button>
                <button
                    onClick={() => {
                        setSelected(false);
                        setText('click for start generating text');
                        clearInterval(idInterval);
                    }}
                >
                    Reset
                </button>
            </>
            <CodeMirror
                value={text}
                height="200px"
                theme={abyss}
                extensions={[javascript({ jsx: true })]}
            />
        </div>
    );
}
