import { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

//uses a generaic type parameter so that the form input can be mofe flexible and accept different types
interface FormProps<incomingField extends string, incomingData extends string | string[]> {
    label: string;
    labelClasses?: string;
    // 'name' passed in as a const string. 
    // It is changed to a generic type so its type can
    // be more restricted for first arg in the onChange
    formName: incomingField;
    formValue?: incomingData;
    placeholder: string;
    onChange: (name: incomingField, value: incomingData) => void;
}

// tailwind classes for the actual text and inputs stored in this single variable, then applied to other functions
export const injectTailwindClassesHere = "input input-bordered w-full h-[130px] max-w-[435px] overflow-hidden overflow-scroll text-neutral-content font-normal mt-1";


const standardLineBreak = "\n";
//standardize line breaks accross OS and browsers
function getStringsByLineBreak(str: string) {
    return str.split(standardLineBreak);
}

function normalizeLineBreak(str: string) {
    return str.replace(/\r?\n/g, standardLineBreak);
}

function doubleUnLinebreak(str: string) {
    return str.replace(/\n\n/g, standardLineBreak);
}


// wraps a label element around an input child so that clicking label will focus the input children. If it were a sibling, it wouldn't work as well.
export function FormGroupWrapper({
    label,
    className,
    children,
}: {
    label: string;
    className?: string;
    children?: React.ReactNode;
}) {
    return (
        <label className={`label-text`}>
            {label}
            {children}
        </label>
    );
}



export function FormInput<FieldName extends string>({
    formName,
    formValue = "",
    placeholder,
    onChange,
    label,
    labelClasses,
}: FormProps<FieldName, string>) {
    return (
        <FormGroupWrapper label={label} className={labelClasses}>
            <input
                type="text"
                name={formName}
                value={formValue}
                placeholder={placeholder}
                onChange={(e) => onChange(formName, e.target.value)}
                className={injectTailwindClassesHere}
            />
        </FormGroupWrapper>
    );
}

export function FormTextarea<FieldName extends string>({
    label,
    labelClasses: wrapperClasses,
    formName,
    formValue = "",
    placeholder,
    onChange,
}: FormProps<FieldName, string>) {
    const textareaRef = useAutosizeTextareaHeight({ value: formValue });

    return (
        <FormGroupWrapper label={label} className={wrapperClasses}>
            <textarea
                //@ts-ignore
                ref={textareaRef}
                name={formName}
                className={`${injectTailwindClassesHere} resize-none overflow-hidden`}
                placeholder={placeholder}
                value={formValue}
                onChange={(e) => onChange(formName, e.target.value)}
            />
        </FormGroupWrapper>
    );
}

/*
A special textarea element in which each new line (/n) starts with a bullet point.
Under the hood it's a div using contentEditable, while preventing any willy-nilly html to just keep the text part.
This basically helps it behave as if it were just a normal text area.
*/

export function BulletListFormTextarea<FieldName extends string>(
    props: FormProps<FieldName, string[]> & { showBulletPoints?: boolean }
) {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const isFirefox = navigator.userAgent.includes("Firefox");
        const isSafari =
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome");
        if (isFirefox || isSafari) {
            setShowFallback(true);
        }
    }, []);

    if (showFallback) {
        //@ts-ignore
        return <BulletListFormTextareaFallback {...props} />;
    }

    return <BulletListFormTextareaGeneral {...props} />;
}



//generic type allows for more flexible and reusable function
export function BulletListFormTextareaGeneral<FieldName extends string>({
    label,
    labelClasses: wrapperClasses,
    formName,
    formValue: bulletListStrings = [],
    placeholder,
    onChange,
    showBulletPoints = true,
}: FormProps<FieldName, string[]> & { showBulletPoints?: boolean }) {
    const html = getHTMLFromBulletListStrings(bulletListStrings);
    return (
        <>
            <FormGroupWrapper label={label} className={wrapperClasses}>
                {/* If this fails to build later, add tsignore here ;) */}
                <ContentEditable
                    contentEditable={true}
                    className={`${injectTailwindClassesHere} cursor-text [&>div]:list-item ${showBulletPoints ? "pl-7" : "[&>div]:list-['']"
                        }`}
                    placeholder={placeholder}
                    onChange={(e) => {
                        if (e.type === "input") {
                            const { innerText } = e.currentTarget as HTMLDivElement;
                            const newBulletListStrings =
                                getBulletListStringsFromInnerText(innerText);
                            onChange(formName, newBulletListStrings);
                        }
                    }}
                    html={html}
                />
            </FormGroupWrapper>
        </>
    );
}

function getHTMLFromBulletListStrings(bulletListStrings: string[]) {
    // make it an empty div if bulletListStrings is passing an empty array 
    if (bulletListStrings.length === 0) {
        return "<div></div>";
    }

    return bulletListStrings.map((text) => `<div>${text}</div>`).join("");
}

function getBulletListStringsFromInnerText(innerText: string) {
    const innerTextWithNormalizedLineBreak = normalizeLineBreak(innerText);

    // make pressing enter in windows chrome create 1 line break instead of the default 2
    let newInnerText = doubleUnLinebreak(innerTextWithNormalizedLineBreak);

    // Handle the special case when content is empty
    if (newInnerText === standardLineBreak) {
        newInnerText = "";
    }

    return getStringsByLineBreak(newInnerText);
}

function getBulletListStringsFromTextareaValue(
    textareaValue: string,
    showBulletPoints: boolean
) {
    const textareaValueWithNormalizedLineBreak =
        normalizeLineBreak(textareaValue);

    const strings = getStringsByLineBreak(textareaValueWithNormalizedLineBreak);

    if (showBulletPoints) {
        // make sure no erroneous strings are passed in
        const nonEmptyStrings = strings.filter((s) => s !== "•");

        let newStrings: string[] = [];
        for (let string of nonEmptyStrings) {
            // Edge case for if user wants to replace bullet point:
            if (string.startsWith("• ")) {
                newStrings.push(string.slice(2));
            } else if (string.startsWith("•")) {
                // if bullet deleted, combine line with previous line if previous line still exists. 
                const lastItemIdx = newStrings.length - 1;
                if (lastItemIdx >= 0) {
                    const lastItem = newStrings[lastItemIdx];
                    newStrings[lastItemIdx] = `${lastItem}${string.slice(1)}`;
                } else {
                    newStrings.push(string.slice(1));
                }
            } else {
                newStrings.push(string);
            }
        }
        return newStrings;
    }

    return strings;
}

function getTextareaValueFromBulletListStrings(
    bulletListStrings: string[],
    showBulletPoints: boolean
) {
    const prefix = showBulletPoints ? "• " : "";

    if (bulletListStrings.length === 0) {
        return prefix;
    }

    let value = "";
    for (let i = 0; i < bulletListStrings.length; i++) {
        const string = bulletListStrings[i];
        const isLastItem = i === bulletListStrings.length - 1;
        value += `${prefix}${string}${isLastItem ? "" : "\r\n"}`;
    }
    return value;
}

// works around Firefox bug to stop 'space' from creating a newline instead of space in innerText
function BulletListFormTextareaFallback<T extends string>({
    label,
    labelClasses,
    formName,
    formValue: bulletListStrings = [],
    placeholder,
    onChange,
    showBulletPoints = true,
}: FormProps<T, string[]> & { showBulletPoints?: boolean }) {
    const textareaValue = getTextareaValueFromBulletListStrings(
        bulletListStrings,
        showBulletPoints
    );

    return (
        <FormTextarea
            label={label}
            labelClasses={labelClasses}
            formName={formName}
            formValue={textareaValue}
            placeholder={placeholder}
            onChange={(name, value) => {
                onChange(name, getBulletListStringsFromTextareaValue(value, showBulletPoints));
            }}
        />
    );
}





//Hook automatically resizes textarea height.
export const useAutosizeTextareaHeight = ({ value }: { value: string }) => {
};
