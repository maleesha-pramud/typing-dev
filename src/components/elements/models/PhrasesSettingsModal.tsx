import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SettingsIcon from '../icons/SettingsIcon'


const PhrasesSettingsModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <SettingsIcon />
      </DialogTrigger>
      <DialogContent className='bg-accent-dark'>
        <DialogHeader>
          <DialogTitle>Change Phrases Settings</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default PhrasesSettingsModal