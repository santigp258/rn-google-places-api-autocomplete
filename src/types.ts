import type React from 'react';
import type { ReactNode } from 'react';

export type FCWithChildren<T = {}> = React.FC<T & { children?: ReactNode }>;

export type ClosableType = {
  onClose: () => void;
  onOpen: () => void;
};

export interface GoogleLocation {
  lat: string;
  lng: string;
}

export interface GoogleViewport {
  northeast: GoogleLocation;
  southwest: GoogleLocation;
}

export interface GoogleGeometry {
  location: GoogleLocation;
  viewport: GoogleViewport;
}

export interface TextSearchResult {
  formatted_address: string;
  geometry: GoogleGeometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  reference: string;
  types: string[];
}

export interface TextSearchResponseI {
  html_attributions: any[];
  results: TextSearchResult[];
  status: string;
}

export interface GoogleMatchedSubstring {
  length: number;
  offset: number;
}

export interface GoogleStructuredFormatting {
  main_text: string;
  main_text_matched_substrings: GoogleMatchedSubstring[];
  secondary_text: string;
}

interface GoogleTerm {
  offset: number;
  value: string;
}

export interface Prediction {
  description: string;
  matched_substrings: GoogleMatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: GoogleStructuredFormatting;
  terms: GoogleTerm[];
  types: string[];
}

export interface PlaceAutocompleteResponseI {
  predictions: Prediction[];
  status: string;
}
