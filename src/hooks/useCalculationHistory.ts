'use client'

import { useState, useEffect } from 'react'

export interface HistoryItem<T> {
    id: string
    date: number
    title: string
    inputs: T
    results: any
}

export function useCalculationHistory<T>(key: string, maxItems = 5) {
    const [history, setHistory] = useState<HistoryItem<T>[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved) {
            try {
                setHistory(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse history', e)
            }
        }
    }, [key])

    const saveToHistory = (title: string, inputs: T, results: any) => {
        const newItem: HistoryItem<T> = {
            id: crypto.randomUUID(),
            date: Date.now(),
            title,
            inputs,
            results
        }

        setHistory(prev => {
            const newHistory = [newItem, ...prev].slice(0, maxItems)
            localStorage.setItem(key, JSON.stringify(newHistory))
            return newHistory
        })
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem(key)
    }

    return { history, saveToHistory, clearHistory }
}
