'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DatabaseTools() {
  const phpMyAdminUrl = 'http://localhost/phpmyadmin'
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Databasverktyg</CardTitle>
        <CardDescription>
          Hantera din databas med phpMyAdmin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          onClick={() => window.open(phpMyAdminUrl, '_blank')}
        >
          Öppna phpMyAdmin
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Använd följande uppgifter för att logga in:
          <br />
          Användare: root
          <br />
          Lösenord: 980911
        </p>
      </CardContent>
    </Card>
  )
}

