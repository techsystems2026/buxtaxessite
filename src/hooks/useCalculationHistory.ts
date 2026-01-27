'use client'

import { useState, useEffect } from 'react'

export interface HistoryItem<T, R = unknown> {
    id: string
    date: number
    title: string
    inputs: T
    results: R
}

export function useCalculationHistory<T, R = unknown>(key: string, maxItems = 5) {
    const [history, setHistory] = useState<HistoryItem<T, R>[]>(() => {
        if (typeof window === 'undefined') return []
        const saved = localStorage.getItem(key)
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch (e) {
                console.error('Failed to parse history', e)
            }
        }
        return []
    })

    // Update history when key changes (e.g. switching calculators)
    useEffect(() => {
        const saved = localStorage.getItem(key)
        const data = saved ? JSON.parse(saved) : []
        // Wrap in setTimeout to avoid synchronous state update in effect error
        const timeoutId = setTimeout(() => {
            setHistory(data)
        }, 0)
        return () => clearTimeout(timeoutId)
    }, [key])

    const saveToHistory = (title: string, inputs: T, results: R) => {
        const newItem: HistoryItem<T, R> = {
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
