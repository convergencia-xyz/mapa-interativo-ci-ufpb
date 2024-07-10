import {
    IconeAuditorio,
    IconeBanheiroFeminino,
    IconeBanheiroMasculino,
    IconeBiblioteca,
    IconeGenerico,
    IconeLaboratorio,
    IconeLaboratorioDePesquisa,
    IconeSalaDeAula,
    IconeSalaProfessor,
} from "./Icones";

import subsolo from "~/data/subsolo.json";
import terreo from "~/data/terreo.json";
import primeiro from "~/data/primeiro.json";
import segundo from "~/data/segundo.json";
import terceiro from "~/data/terceiro.json";
import { ReactNode } from "react";
import { keys } from "@mantine/core";

function Text({
    text,
    x,
    y,
    fontFamily = "Arial",
    fontSize = "14",
    fill = "black",
    textAnchor = "middle",
    alignmentBaseline = "central",
    fontWeight = "bold",
}: {
    text: string;
    x: number;
    y: number;
    fontFamily?: string;
    fontSize?: string;
    fill?: string;
    textAnchor?: string;
    alignmentBaseline?:
        | "middle"
        | "central"
        | "inherit"
        | "auto"
        | "baseline"
        | "before-edge"
        | "text-before-edge"
        | "after-edge"
        | "text-after-edge"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical";
    fontWeight?: string;
}) {
    return (
        <>
            <text
                x={x}
                y={y}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fill={fill}
                textAnchor={textAnchor}
                alignmentBaseline={alignmentBaseline}
                fontWeight={fontWeight}
            >
                {text}
            </text>
        </>
    );
}
function calculateTransform(
    cx: number,
    cy: number,
    svgWidth: number,
    svgHeight: number,
    scaleFactor: number,
) {
    // Calcular o tamanho do SVG após a escala
    const scaledWidth = svgWidth * scaleFactor;
    const scaledHeight = svgHeight * scaleFactor;

    // Encontrar o ponto de origem para que o centro do SVG coincida com o centro do círculo
    const translateX = cx - (scaledWidth / 2);
    const translateY = cy - (scaledHeight / 2);

    // Retorna as coordenadas de translação
    return `translate(${translateX}, ${translateY}) scale(${scaleFactor})`;
}

interface PathProps {
    fill?: string;
    d: string;
    id?: string;
    type?:
        | "sala-de-aula"
        | "sala-de-professor"
        | "banheiro-masculino"
        | "banheiro-feminino"
        | "biblioteca"
        | "auditorio"
        | "laboratorio"
        | "laboratorio-de-pesquisa"
        | "generico"
        | "none";
    title?: string;
    description?: string;
    fillOpacity?: string;
    fillRule?: "nonzero" | "evenodd" | "inherit";
    stroke?: string;
    strokeWidth?: string;
    strokeLinecap?: "round" | "butt" | "inherit" | "square";
    strokeLinejoin?: "round" | "inherit" | "miter" | "bevel";
}

function parseSvgPath(
    d: string,
): { minX: number; maxX: number; minY: number; maxY: number } {
    // Remove letras e divide em valores numéricos
    const coords = d.replace(/[a-zA-Z]/g, " ").split(/\s+/).filter(Boolean).map(
        Number,
    );

    // Inicializa variáveis de bounding box
    let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

    // Variáveis para acompanhar a posição atual
    let currentX = 0;
    let currentY = 0;

    // Processa cada par de coordenadas
    for (let i = 0; i < coords.length; i += 2) {
        // Atualiza posição atual
        currentX += coords[i];
        currentY += coords[i + 1];

        // Atualiza os limites da bounding box
        minX = Math.min(minX, currentX);
        maxX = Math.max(maxX, currentX);
        minY = Math.min(minY, currentY);
        maxY = Math.max(maxY, currentY);
    }

    return { minX, maxX, minY, maxY };
}
function Path(props: PathProps) {
    if (!props.type) {
        return (
            <>
                <path
                    fill={props.fill}
                    d={props.d}
                    fillRule={props.fillRule}
                    id={props.id}
                    stroke={props.stroke}
                    strokeWidth={props.strokeWidth}
                    strokeLinecap={props.strokeLinecap}
                    strokeLinejoin={props.strokeLinejoin}
                />
            </>
        );
    }

    const d = props.d;

    const dim = 200;

    const { minX, maxX, minY, maxY } = parseSvgPath(d);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const width = maxX - minX;
    const height = maxY - minY;
    let text_distance = height * 0.15;

    let icone : ReactNode | null = <IconeGenerico width={dim} height={dim} />;

    switch (props.type) {
        case "sala-de-aula":
            icone = <IconeSalaDeAula width={dim} height={dim} />;
            break;
        case "sala-de-professor":
            icone = <IconeSalaProfessor width={dim} height={dim} />;
            break;
        case "banheiro-masculino":
            icone = <IconeBanheiroMasculino width={dim} height={dim} />;
            break;
        case "banheiro-feminino":
            icone = <IconeBanheiroFeminino width={dim} height={dim} />;
            break;
        case "biblioteca":
            icone = <IconeBiblioteca width={dim} height={dim} />;
            break;
        case "auditorio":
            icone = <IconeAuditorio width={dim} height={dim} />;
            break;
        case "laboratorio":
            icone = <IconeLaboratorio width={dim} height={dim} />;
            break;
        case "laboratorio-de-pesquisa":
            icone = <IconeLaboratorioDePesquisa width={dim} height={dim} />;
            break;
        case "generico":
            icone = <IconeGenerico width={dim} height={dim} />;
            break;
        default:
            icone = null;
            text_distance = height * 0.15;
            break;
    }

    const calculateFontSize = (baseFontSize: number, text: string): number => {
        const scaleFactor = 0.8;
        const neededWidth = text.length * baseFontSize * scaleFactor;
        return neededWidth > width
            ? width / (text.length * scaleFactor)
            : baseFontSize;
    };

    return (
        <>
            <path
                fill={props.fill}
                d={props.d}
                fillRule={props.fillRule}
                id={props.id}
            />

            <g
                transform={calculateTransform(
                    centerX,
                    centerY,
                    dim,
                    dim,
                    0.25,
                )}
            >
                {icone}
            </g>
            <Text
                x={centerX}
                y={centerY - text_distance -
                    (!props.description && (props.type === "none") ? 0 : 15)}
                text={props.title ? props.title.toUpperCase() : ""}
                fontSize={props.title
                    ? calculateFontSize(16, props.title).toString()
                    : undefined}
                fontWeight="bold"
            />
            <Text
                x={centerX}
                y={centerY + text_distance +
                    (!props.title && (props.type === "none") ? 0 : 15)}
                fontSize={props.description
                    ? calculateFontSize(12, props.description).toString()
                    : undefined}
                fontWeight="bold"
                text={props.description ? props.description.toUpperCase() : ""}
            />
        </>
    );
}


interface ISala {
    title: string;
    description: string;
    id: string;
    color: string;
    colorOnHover: string;
    d: string;
}

export function Subsolo() {
    const svg_id = "subsolo";

    const salas: ISala[] = [];

    const styles = salas.map((component: ISala) => {
        return `
    #${svg_id} path#${component.id}:hover {
        fill: ${component.colorOnHover};
        stroke: red;
        stroke-width: 3px;
        transition: fill 0.4s;
    }           
            `;
    });
    const elementos = subsolo.map((component: any, index: number) => (

        <Path
            key={svg_id + index}
            {...component}
        />
    ));

    return (
        <>
            <style>
                {styles}
            </style>
            <svg
                version="1.1"
                viewBox="0.0 0.0 960.0 540.0"
                fill="none"
                stroke="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs />
                <clipPath id="g11a8898941b_2_160.0">
                    <path
                        d="m0 0l960.0 0l0 540.0l-960.0 0l0 -540.0z"
                        clipRule="nonzero"
                    />
                </clipPath>
                <g clipPath="url(#g11a8898941b_2_160.0)">
                    {elementos}
                </g>
            </svg>
        </>
    );
}

export function Terreo() {
    const svg_id = "terreo";
    const salas: ISala[] = [];

    const styles = salas.map((component: ISala) => {
        return `
#${svg_id} path#${component.id}:hover {
    fill: ${component.colorOnHover};
    stroke: red;
    stroke-width: 3px;
    transition: fill 0.4s;
}           
        `;
    });
    const elementos = terreo.map((component: any, index: number) => (

        <Path
            key={svg_id + index}
            {...component}
        />
    ));
    return (
        <>
            <style>
                {styles}
            </style>
            <svg
                version="1.1"
                viewBox="0.0 0.0 960.0 540.0"
                fill="none"
                stroke="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs />
                <clipPath id="g11a8898941b_2_160.0">
                    <path
                        d="m0 0l960.0 0l0 540.0l-960.0 0l0 -540.0z"
                        clipRule="nonzero"
                    />
                </clipPath>
                <g clipPath="url(#g11a8898941b_2_160.0)">
                    {elementos}
                </g>
            </svg>
        </>
    );
}

export function PrimeiroAndar() {
    const svg_id = "primeiro-andar";

    const styles = [].map((component: ISala) => {
        return `
#${svg_id} path#${component.id}:hover {
    fill: ${component.colorOnHover};
    stroke: red;
    stroke-width: 3px;
    transition: fill 0.4s;
}           
        `;
    });

    const elementos = primeiro.map((component: any, index: number) => (

        <Path
            key={svg_id + index}
            {...component}
        />
    ));

    return (
        <>
            <style>
                {styles}
            </style>
            <svg
                version="1.1"
                viewBox="0.0 0.0 960.0 540.0"
                fill="none"
                stroke="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs />
                <clipPath id="g11a8898941b_2_168.0">
                    <path
                        d="m0 0l960.0 0l0 540.0l-960.0 0l0 -540.0z"
                        clipRule="nonzero"
                    />
                </clipPath>
                <g clipPath="url(#g11a8898941b_2_168.0)">{elementos}</g>
            </svg>
        </>
    );
}

export function SegundoAndar() {
    const svg_id = "segundo-andar";

    const salas: ISala[] = [];

    const styles = salas.map((component: ISala) => {
        return `
#${svg_id} path#${component.id}:hover {
    fill: ${component.colorOnHover};
    stroke: red;
    stroke-width: 3px;
    transition: fill 0.4s;
}           
        `;
    });

    const elementos = segundo.map((component: any, index: number) => (

        <Path
            key={svg_id + index}
            {...component}
        />
    ));

    return (
        <>
            <style>
                {styles}
            </style>
            <svg
                version="1.1"
                viewBox="0.0 0.0 960.0 540.0"
                fill="none"
                stroke="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs />
                <clipPath id="g11a8898941b_2_586.0">
                    <path
                        d="m0 0l960.0 0l0 540.0l-960.0 0l0 -540.0z"
                        clipRule="nonzero"
                    />
                </clipPath>
                <g clipPath="url(#g11a8898941b_2_586.0)">{elementos}</g>
            </svg>
        </>
    );
}

export function TerceiroAndar() {
    const svg_id = "terceiro-andar";
    const salas: ISala[] = [];

    const styles = salas.map((component: ISala) => {
        return `
#${svg_id} path#${component.id}:hover {
    fill: ${component.colorOnHover};
    stroke: red;
    stroke-width: 3px;
    transition: fill 0.4s;
}           
        `;
    });

    const elementos = terceiro.map((component: any, index: number) => (

        <Path
            key={svg_id + index}
            {...component}
        />
    ));

    return (
        <>
            <style>
                {styles}
            </style>
            <svg
                version="1.1"
                viewBox="0.0 0.0 960.0 540.0"
                fill="none"
                stroke="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs />
                <clipPath id="g11a8898941b_2_1564.0">
                    <path
                        d="m0 0l960.0 0l0 540.0l-960.0 0l0 -540.0z"
                        clipRule="nonzero"
                    />
                </clipPath>
                <g clipPath="url(#g11a8898941b_2_1564.0)">
                    {elementos}
                </g>
            </svg>
        </>
    );
}
