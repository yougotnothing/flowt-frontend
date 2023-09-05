import React from "react";

export type booleanState = (value: React.SetStateAction<boolean>) => void;
export type nullState = (value: React.SetStateAction<null>) => void;
export type stringState = (value: React.Dispatch<React.SetStateAction<string>>) => void;